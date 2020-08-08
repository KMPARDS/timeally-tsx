import React, { Component } from 'react';
import { Button, DropdownButton, Dropdown, Card, Alert, Spinner, Form } from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import '../../../Stakings.css';
import { routine } from '../../../../../utils';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
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
};

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
  };

  instance = this.props.instance;
  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateDetails, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateDetails = async () => {
    const issTimeTotalLimit = await this.instance.getTotalIssTime(this.state.issTimeDestroy);
    const issTimeTimestamp = await this.instance.issTimeTimestamp();

    // @TODO: remove any
    const newState: any = { issTimeTotalLimit, issTimeTimestamp: issTimeTimestamp.toNumber() };

    if (!issTimeTimestamp.eq(0)) {
      newState.issTimeTakenValue = await this.instance.issTimeTakenValue();
      newState.issTimeInterest = await this.instance.getIssTimeInterest();
    }

    this.setState(newState);
  };

  startIssTime = async () => {
    this.setState({ spinner: true });
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
        errorMessage: `Error from smart contract: ${error.message}`,
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
        errorMessage: `Error from smart contract: ${error.message}`,
        spinner: false,
      });
    }
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

        {this.props.destroyStatus !== null ? (
          <Alert variant="danger">
            The staking contract is destroyed, so if there was any IssTime limit it has been
            destroyed along with the staking (using EVM selfdestruct opcode).
          </Alert>
        ) : (
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="wrapper-content-stack bg-white pinside10">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row ">
                      <div className="col-md-6 col-lg-6 pdb30">
                        <h3>Check your eligibility for Loans</h3>
                        <p>
                          Lever A:{' '}
                          {this.state.issTimeTotalLimit === null
                            ? 'Loading...'
                            : `${ethers.utils.formatEther(this.state.issTimeTotalLimit)} ES`}
                        </p>
                        <p>Lever B: Comming soon...</p>
                        <p>Lever C: Comming soon...</p>
                        <p>Lever D: Comming soon...</p>
                        <p>
                          Total:{' '}
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
                                title={
                                  this.state.issTimeDestroy ? 'Destroy Staking' : 'Normal Loan'
                                }
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
                                  {ethers.utils.formatEther(this.state.issTimeTakenValue)} ES.{' '}
                                  <br />
                                  Live ticker for the repayment amount:{' '}
                                  {ethers.utils.formatEther(
                                    this.state.issTimeTakenValue.add(this.state.issTimeInterest)
                                  )}
                                </p>
                              ) : (
                                'Loading...'
                              )}

                              <Alert variant="info">
                                Since the ticker fluctuates every moment, to make repayment
                                convenient you can repay a larger amount and the smart contract
                                returns the change back to you.
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
        )}
      </div>
    );
  }
}
