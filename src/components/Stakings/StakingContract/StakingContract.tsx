import React, { Component } from 'react';
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Layout } from '../../Layout';
import { Withdraw } from './Withdraw';
import { Topup } from './Topup';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import '../Stakings.css';

interface MatchParams {
  address: string;
}

interface State {
  owner: string | null;
  startMonth: number | null;
  endMonth: number | null;
  issTime: ethers.BigNumber | null;
}

export class StakingContract extends Component<RouteComponentProps<MatchParams>, State> {
  state: State = {
    owner: null,
    startMonth: null,
    endMonth: null,
    issTime: null,
  };

  instance = TimeAllyStakingFactory.connect(
    this.props.match.params.address,
    window.wallet ?? window.provider
  );

  componentDidMount = async () => {
    await this.updateDetails();
  };

  updateDetails = async () => {
    const owner = await this.instance.owner();
    const startMonth = await this.instance.startMonth();
    const endMonth = await this.instance.endMonth();
    const issTime = await this.instance.issTime();

    this.setState({
      owner,
      startMonth: startMonth.toNumber(),
      endMonth: endMonth.toNumber(),
      issTime,
    });
  };

  render() {
    const {
      url,
      params: { address },
    } = this.props.match;

    return (
      <Layout
        title="Staking Contract"
        subtitle={address}
        breadcrumb={['Home', 'Stakings', address]}
      >
        <Card>
          <Table>
            <tbody>
              <tr>
                <td>Owner</td>
                <td>{this.state.owner !== null ? this.state.owner : 'Loading...'}</td>
              </tr>
              <tr>
                <td>Start Month</td>
                <td>{this.state.startMonth !== null ? this.state.startMonth : 'Loading...'}</td>
              </tr>
              <tr>
                <td>End Month</td>
                <td>{this.state.endMonth !== null ? this.state.endMonth : 'Loading...'}</td>
              </tr>
              <tr>
                <td>IssTime</td>
                <td>
                  {this.state.issTime !== null
                    ? `${ethers.utils.formatEther(this.state.issTime)} ES`
                    : 'Loading...'}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>

        <div className="stack-bgd-color">
          <div className="row stack-box-flex">
            <Link to={`${url}/withdraw`} className="stack-link">
              WITHDRAW
            </Link>

            <Link to={`${url}/topup`} className="stack-link">
              TOP UP
            </Link>

            <Link to={`${url}/isstime`} className="stack-link">
              ISSTIME
            </Link>

            <Link to={`${url}/split`} className="stack-link">
              SPILT TRANSFER MERGE
            </Link>

            <Link to={`${url}/delegate`} className="stack-link">
              DELEGATE
            </Link>
          </div>
        </div>

        <Switch>
          <Route path={`${url}/withdraw`} exact>
            <Withdraw
              instance={this.instance}
              startMonth={this.state.startMonth}
              endMonth={this.state.endMonth}
            />
          </Route>
          <Route path={`${url}/topup`} exact>
            <Topup instance={this.instance} />
          </Route>
        </Switch>
      </Layout>
    );
  }
}
