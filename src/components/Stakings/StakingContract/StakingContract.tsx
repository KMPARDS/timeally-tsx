import React, { Component } from 'react';
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Layout } from '../../Layout';
import { Withdraw } from './Tabs/Withdraw';
import { Topup } from './Tabs/Topup';
import { Extend } from './Tabs/Extend';
import { IssTime } from './Tabs/IssTime';
import { Split } from './Tabs/Split';
import { Transfer } from './Tabs/Transfer';
import { Merge } from './Tabs/Merge';
import { Delegate } from './Tabs/Delegate';
import { Nominee } from './Tabs/Nominee';

import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import '../Stakings.css';
import { EraswapInfo } from '../../../utils';

interface MatchParams {
  address: string;
}

interface State {
  owner: string | null;
  startMonth: number | null;
  endMonth: number | null;
  currentMonth: number | null;
  principal: ethers.BigNumber | null;
  issTime: ethers.BigNumber | null;
  balance: ethers.BigNumber | null;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
}

export class StakingContract extends Component<RouteComponentProps<MatchParams>, State> {
  state: State = {
    owner: null,
    startMonth: null,
    endMonth: null,
    currentMonth: null,
    principal: null,
    issTime: null,
    balance: null,
    destroyStatus: null,
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.match.params.address,
    window.wallet ?? window.provider
  );

  componentDidMount = async () => {
    await this.updateDetails();
  };

  updateDetails = async () => {
    try {
      const owner = await this.instance.owner();
      const startMonth = await this.instance.startMonth();
      const endMonth = await this.instance.endMonth();
      const currentMonth = await window.nrtManagerInstance.currentNrtMonth();
      const principal = await this.instance.nextMonthPrincipalAmount();
      const issTime = await this.instance.issTimeLimit();
      const balance = await window.provider.getBalance(this.instance.address);

      this.setState({
        owner,
        startMonth: startMonth.toNumber(),
        endMonth: endMonth.toNumber(),
        currentMonth: currentMonth.toNumber(),
        principal,
        issTime,
        balance,
      });
    } catch (error) {
      const parsedLogs = (
        await this.instance.queryFilter(this.instance.filters.Destroy(null))
      ).map((log): [ethers.Event, ethers.utils.LogDescription] => [
        log,
        this.instance.interface.parseLog(log),
      ]);

      if (parsedLogs.length) {
        const reason: 0 | 1 | 2 = parsedLogs[0][1].args[0];
        const txHash = parsedLogs[0][0].transactionHash;
        let mergedIn: string | null = null;

        if (reason === 2) {
          const parsedLogs = (
            await window.timeallyManagerInstance.queryFilter(
              window.timeallyManagerInstance.filters.StakingMerge(null, this.instance.address)
            )
          ).map((log) => window.timeallyManagerInstance.interface.parseLog(log));

          if (parsedLogs.length) {
            mergedIn = parsedLogs[0].args[0];
          }
        }

        this.setState({
          destroyStatus: {
            reason,
            txHash,
            mergedIn,
          },
        });
      } else {
        throw error;
      }
    }
  };

  render() {
    const {
      url,
      params: { address },
    } = this.props.match;

    return (
      <Layout title="Staking Contract" subtitle={address}>
        {process.env.NODE_ENV === 'development' ? (
          <p style={{ color: 'red' }}>[This is a Testnet staking]</p>
        ) : null}
        <Card>
          <Table responsive>
            {this.state.destroyStatus === null ? (
              <tbody>
                <tr>
                  <td>Current Owner</td>
                  <td>
                    {this.state.owner !== null ? (
                      <span className="hex-string">
                        <a target="_blank" href={EraswapInfo.getAddressHref(this.state.owner)}>
                          {this.state.owner}
                        </a>
                      </span>
                    ) : (
                      'Loading...'
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Start NRT Month</td>
                  <td>{this.state.startMonth !== null ? this.state.startMonth : 'Loading...'}</td>
                </tr>
                <tr>
                  <td>End NRT Month</td>
                  <td>{this.state.endMonth !== null ? this.state.endMonth : 'Loading...'}</td>
                </tr>
                <tr>
                  <td>Age of contract</td>
                  <td>
                    {this.state.startMonth !== null && this.state.currentMonth !== null
                      ? `${this.state.currentMonth - this.state.startMonth + 1} NRTs`
                      : 'Loading...'}
                  </td>
                </tr>
                <tr>
                  <td>ES Staked</td>
                  <td>
                    {this.state.principal !== null
                      ? `${ethers.utils.formatEther(this.state.principal)} ES`
                      : 'Loading...'}
                  </td>
                </tr>
                <tr>
                  <td>IssTime Limit</td>
                  <td>
                    {this.state.issTime !== null
                      ? `${ethers.utils.formatEther(this.state.issTime)} ES`
                      : 'Loading...'}
                  </td>
                </tr>
                <tr>
                  <td>
                    Balance (smart contract balance, should be same as principal amount. This value
                    will be removed in future. If this value and principal is different, it is a
                    signal that there is a bug in smart contract)
                  </td>
                  <td>
                    {this.state.balance !== null
                      ? `${ethers.utils.formatEther(this.state.balance)} ES`
                      : 'Loading...'}
                  </td>
                </tr>
              </tbody>
            ) : (
              <>
                <tbody>
                  <tr>
                    <td colSpan={2}>
                      <h5>
                        This staking smart contract was destroyed with EVM selfdestruct opcode
                      </h5>
                    </td>
                  </tr>
                  <tr>
                    <td>Destroy Reason</td>
                    <td>
                      {(() => {
                        switch (this.state.destroyStatus.reason) {
                          case 0:
                            return <>IssTime Exit</>;
                          case 1:
                            return <>IssTime Report</>;
                          case 2:
                            return this.state.destroyStatus.mergedIn ? (
                              <>
                                merging inside{' '}
                                <Link
                                  to={`/stakings/${this.state.destroyStatus.mergedIn}`}
                                  className="hex-string"
                                >
                                  {this.state.destroyStatus.mergedIn.slice(0, 8)}..
                                </Link>
                              </>
                            ) : (
                              <>Merged</>
                            );
                          default:
                            return 'Unknown destroy reason';
                        }
                      })()}
                    </td>
                  </tr>
                  <tr>
                    <td>Destroy transaction</td>
                    <td>
                      <a
                        target="_blank"
                        href={EraswapInfo.getTxHref(this.state.destroyStatus.txHash)}
                        className="hex-string"
                      >
                        {this.state.destroyStatus.txHash.slice(0, 12)}..
                      </a>
                    </td>
                  </tr>
                </tbody>
              </>
            )}
          </Table>
        </Card>

        <div className="stack-bgd-color">
          <div className="stack-box-flex">
            <Link to={`${url}/withdraw`} className="stack-link">
              WITHDRAW
            </Link>

            <Link to={`${url}/topup`} className="stack-link">
              TOP UP
            </Link>

            <Link to={`${url}/extend`} className="stack-link">
              EXTEND
            </Link>

            <Link to={`${url}/isstime`} className="stack-link">
              ISSTIME <img src="/images/new.png" className="new-img" alt="TimeAlly" />
            </Link>

            <Link to={`${url}/split`} className="stack-link">
              SPILT <img src="/images/new.png" className="new-img" alt="TimeAlly" />
            </Link>

            <Link to={`${url}/transfer`} className="stack-link">
              TRANSFER <img src="/images/new.png" className="new-img" alt="TimeAlly" />
            </Link>

            <Link to={`${url}/merge`} className="stack-link">
              MERGE <img src="/images/new.png" className="new-img" alt="TimeAlly" />
            </Link>

            <Link to={`${url}/delegate`} className="stack-link">
              DELEGATE <img src="/images/new.png" className="new-img" alt="TimeAlly" />
            </Link>

            <Link to={`${url}/nominee`} className="stack-link">
              NOMINEE
            </Link>
          </div>
        </div>
        <br />
        <Switch>
          <Route path={`${url}/withdraw`} exact>
            {(this.state.startMonth !== null && this.state.endMonth !== null) ||
            this.state.destroyStatus !== null ? (
              <Withdraw
                instance={this.instance}
                startMonth={this.state.startMonth}
                endMonth={this.state.endMonth}
                refreshDetailsHook={this.updateDetails}
                destroyStatus={this.state.destroyStatus}
              />
            ) : (
              <>Loading...</>
            )}
          </Route>
          <Route path={`${url}/topup`} exact>
            <Topup
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/extend`} exact>
            <Extend
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/isstime`} exact>
            <IssTime
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/split`} exact>
            <Split
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/transfer`} exact>
            <Transfer
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/merge`} exact>
            <Merge
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/delegate`} exact>
            <Delegate
              instance={this.instance}
              refreshDetailsHook={this.updateDetails}
              destroyStatus={this.state.destroyStatus}
            />
          </Route>
          <Route path={`${url}/nominee`} exact component={Nominee} />
        </Switch>
      </Layout>
    );
  }
}
