import React, { Component, useEffect, useState } from 'react';
import {
  Button,
  DropdownButton,
  Dropdown,
  Card,
  Alert,
  Spinner,
  Form,
  Table,
} from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from 'eraswap-sdk/dist/typechain/ESN';
import '../../../Stakings.css';
import { routine, renderEthersJsError, EraswapInfo } from '../../../../../utils';
import { formatEther } from 'ethers/lib/utils';
import { AddressDisplayer } from '../../../../../AddressDisplayer';
import { BlockNumberToTimeElapsed } from '../../../../../BlockNumberToTimeElapsed';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  // destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  issTimeTotalLimit: ethers.BigNumber | null;
  issTimeTimestamp: number | null; // if non zero means an isstime is going on
  valueInput: string;
  issTimeDestroy: boolean;
  errorMessage: string;
  issTimeTakenValue: ethers.BigNumber | null;
  issTimeInterest: ethers.BigNumber | null;
  spinner: boolean;
  issTimeIncreases: IssTimeIncrease[] | null;
  activeDayswappers: number | null;
};

interface IssTimeIncrease {
  amount: ethers.BigNumber;
  0: ethers.BigNumber;
  benefactor: string;
  1: string;
  txHash: string;
  blockNumber: number;
}

export class IssTime extends Component<Props, State> {
  state: State = {
    issTimeTotalLimit: null,
    issTimeTimestamp: null,
    valueInput: '',
    issTimeDestroy: false,
    errorMessage: '',
    issTimeTakenValue: null,
    issTimeInterest: null,
    spinner: false,
    issTimeIncreases: null,
    activeDayswappers: null,
  };

  instance = this.props.instance;
  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateDetails, 8000));
    this.intervalIds.push(routine(this.loadIssTimeIncreases, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateDetails = async () => {
    const issTimeTotalLimit = await this.instance.getTotalIssTime(this.state.issTimeDestroy);
    const issTimeTimestamp = await this.instance.issTimeTimestamp();

    const month = await window.nrtManagerInstance.currentNrtMonth();
    const activeDayswappers = (
      await window.dayswappersInstance.getTotalMonthlyActiveDayswappers(month)
    ).toNumber();

    // @TODO: remove any
    const newState: any = { issTimeTotalLimit, issTimeTimestamp, activeDayswappers };

    if (issTimeTimestamp !== 0) {
      newState.issTimeTakenValue = await this.instance.issTimeTakenValue();
      newState.issTimeInterest = await this.instance.getIssTimeInterest();
    }

    this.setState(newState);
  };

  startIssTime = async () => {
    this.setState({ spinner: true });
    const principal = await this.instance.nextMonthPrincipalAmount();
    if (
      parseFloat(this.state.valueInput) >=
      parseFloat(ethers.utils.formatEther(principal)) * 0.97
    ) {
      alert("You can't take loan more then of 97%* of ES staked");
      this.setState({ spinner: false });
      return;
    }

    try {
      const tx = await this.instance.startIssTime(
        ethers.utils.parseEther(this.state.valueInput),
        this.state.issTimeDestroy
      );
      await tx.wait();
      this.setState({ spinner: false });
      this.updateDetails();
    } catch (error) {
      this.setState({
        errorMessage: renderEthersJsError(error),
        spinner: false,
      });
    }
  };

  submitIssTime = async () => {
    this.setState({ spinner: true });
    try {
      const tx = await this.instance.submitIssTime({
        value: ethers.utils.parseEther(this.state.valueInput),
      });
      await tx.wait();
      this.setState({ spinner: false });
      this.updateDetails();
    } catch (error) {
      this.setState({
        errorMessage: renderEthersJsError(error),
        spinner: false,
      });
    }
  };

  loadIssTimeIncreases = async () => {
    const logs = await this.instance.queryFilter(this.instance.filters.IssTimeIncrease(null, null));
    const args = logs.map(
      (log) =>
        (({
          ...log.args,
          txHash: log.transactionHash,
          blockNumber: log.blockNumber,
        } as unknown) as IssTimeIncrease)
    );
    console.log(args);

    this.setState({ issTimeIncreases: args });
  };

  render() {
    // checks if user's arbitary input is a valid ES value
    let isAmountValid = false;
    try {
      ethers.utils.parseEther(this.state.valueInput); // also throws for empty string
      isAmountValid = true;
    } catch {}

    return (
      <div className="container dashboard-bg">
        <h3>IssTime</h3>

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wrapper-content-stack bg-white pinside10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row ">
                    <div className="col-md-12 col-lg-12 pdb30">
                      {/* <h3>Check your eligibility for Loans</h3>
                        <p>
                          Lever A:{' '}
                          {this.state.issTimeTotalLimit === null
                            ? 'Loading...'
                            : `${ethers.utils.formatEther(this.state.issTimeTotalLimit)} ES`}
                        </p>
                        <p>Lever B: Comming soon...</p>
                        <p>Lever C: Comming soon...</p>
                        <p>Lever D: Comming soon...</p> */}
                      {this.state.issTimeIncreases !== null ? (
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>IssTime Credited</th>
                              <th>Source</th>
                              <th>Timestamp</th>
                              <th>Tx hash</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.issTimeIncreases.map((event) => (
                              <tr>
                                <td>{formatEther(event[0])} ES</td>
                                <td>
                                  <AddressDisplayer address={event[1]} />
                                </td>
                                <td>
                                  <BlockNumberToTimeElapsed blockNumber={event.blockNumber} />
                                </td>
                                <td>
                                  <a target="_blank" href={EraswapInfo.getTxHref(event.txHash)}>
                                    View Tx on Eraswap.info
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <>
                          You will see list of sources of IssTime received. To get IssTime, withdraw
                          your rewards on various platforms in restake mode.
                        </>
                      )}
                      <p>
                        Active Dayswappers: {this.state.activeDayswappers}. IssTime:{' '}
                        {(() => {
                          if (this.state.activeDayswappers === null) {
                            return 'Loading...';
                          } else if (this.state.activeDayswappers < 10000) {
                            return '0%';
                          } else {
                            return (
                              Math.min(this.state.activeDayswappers / (10000 * 100), 100) + '%'
                            );
                          }
                        })()}
                      </p>
                      <p>
                        Total IssTime:{' '}
                        {this.state.issTimeTotalLimit === null
                          ? 'Loading...'
                          : `${ethers.utils.formatEther(this.state.issTimeTotalLimit)} ES`}
                      </p>
                      {/* <div className="btn-action">
                      <Button className="pink-btn">CHECK ELIGIBILITY</Button>
                    </div> */}
                    </div>
                    <div className="col-md-6 col-lg-6 pdb30">
                      <div className="m-2">
                        {this.state.issTimeTimestamp === null ? (
                          <>Loading...</>
                        ) : this.state.issTimeTimestamp === 0 ? (
                          <>
                            <h3>Select IssTime mode:</h3>
                            <DropdownButton
                              id="dropdown-basic-button"
                              variant="secondary"
                              title={this.state.issTimeDestroy ? 'Destroy Staking' : 'Normal Loan'}
                            >
                              <Dropdown.Item
                                onClick={() => this.setState({ issTimeDestroy: true })}
                              >
                                Destroy Staking
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => this.setState({ issTimeDestroy: false })}
                              >
                                Normal Loan
                              </Dropdown.Item>
                            </DropdownButton>

                            <Form.Control
                              className="stakingInput"
                              onChange={(event) =>
                                this.setState({ valueInput: event.target.value })
                              }
                              value={this.state.valueInput}
                              type="text"
                              placeholder="Enter IssTime value"
                              style={{ width: '325px' }}
                              autoComplete="off"
                              isInvalid={this.state.valueInput === '' ? false : !isAmountValid}
                            />

                            {isAmountValid && this.state.issTimeDestroy === false ? (
                              <Alert variant="info">
                                You will be charged {+this.state.valueInput * 0.001} ES per day as
                                interest. Also, please not that there is a cool-off period of one
                                month for starting next IssTime.
                              </Alert>
                            ) : null}

                            {this.state.errorMessage ? (
                              <Alert variant="danger">{this.state.errorMessage}</Alert>
                            ) : null}

                            <Button onClick={this.startIssTime} disabled={this.state.spinner}>
                              {this.state.spinner ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  style={{ marginRight: '2px' }}
                                />
                              ) : null}
                              {this.state.spinner ? 'Starting...' : 'Take Loan'}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Alert variant="info">
                              Your IssTime is started on{' '}
                              {new Date(this.state.issTimeTimestamp * 1000).toLocaleString()}. You
                              have 30 days to repay else your staking will be burned.
                            </Alert>
                            {this.state.issTimeTakenValue && this.state.issTimeInterest ? (
                              <p>
                                Your IssTime taken value is{' '}
                                {ethers.utils.formatEther(this.state.issTimeTakenValue)} ES. <br />
                                Live ticker for the repayment amount:{' '}
                                {ethers.utils.formatEther(
                                  this.state.issTimeTakenValue.add(this.state.issTimeInterest)
                                )}
                              </p>
                            ) : (
                              'Loading...'
                            )}

                            <Alert variant="info">
                              Since the ticker fluctuates every moment, to make repayment convenient
                              you can repay a larger amount and the smart contract returns the
                              change back to you.
                            </Alert>

                            <Form.Control
                              className="stakingInput"
                              onChange={(event) =>
                                this.setState({ valueInput: event.target.value })
                              }
                              value={this.state.valueInput}
                              type="text"
                              placeholder="Enter IssTime repay amount"
                              style={{ width: '325px' }}
                              autoComplete="off"
                              isInvalid={this.state.valueInput === '' ? false : !isAmountValid}
                            />

                            {this.state.errorMessage ? (
                              <Alert variant="danger">{this.state.errorMessage}</Alert>
                            ) : null}

                            <Button onClick={this.submitIssTime} disabled={this.state.spinner}>
                              {this.state.spinner ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  style={{ marginRight: '2px' }}
                                />
                              ) : null}
                              {this.state.spinner ? 'Submitting...' : 'Submit IssTime'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
