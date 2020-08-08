import React, { Component } from 'react';
import { Table, Button, DropdownButton, Dropdown, Card, Alert, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { EraswapInfo } from '../../../../../utils';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import '../../../Stakings.css';

type Props = {
  instance: TimeAllyStaking;
  startMonth: number | null;
  endMonth: number | null;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  currentMonth: number | null;
  benefits: { amount: ethers.BigNumber | null; claimed: boolean }[] | null;
  selectedMonths: number[];
  rewardType: 0 | 1 | 2 | null;
  spinner: boolean;
  displayMessage: string;
  claims: BenefitClaim[] | null;
};

interface BenefitClaim {
  nrtMonth: number;
  amount: ethers.BigNumber;
  rewardType: 0 | 1 | 2;
  txHash: string;
}

export class Withdraw extends Component<Props, State> {
  state: State = {
    currentMonth: null,
    benefits: null,
    selectedMonths: [],
    rewardType: null,
    spinner: false,
    displayMessage: '',
    claims: null,
  };

  instance = this.props.instance;
  monthsArray =
    this.props.startMonth !== null && this.props.endMonth !== null
      ? Object.keys([...Array(this.props.endMonth - this.props.startMonth + 1)]).map(
          (n) => +n + (this.props.startMonth ?? 0)
        )
      : null;

  componentDidMount = async () => {
    this.updateNrtMonth();
    this.loadClaims();
    this.updateBenefits();
  };

  updateNrtMonth = async () => {
    const currentMonth = await window.nrtManagerInstance.currentNrtMonth();

    this.setState({ currentMonth: currentMonth.toNumber() });
  };

  updateBenefits = async () => {
    if (this.monthsArray !== null) {
      const benefits = await Promise.all(
        this.monthsArray.map(async (month) => {
          if (this.state.currentMonth !== null && month > this.state.currentMonth) {
            return { amount: null, claimed: false };
          }

          return {
            amount: await this.instance.getMonthlyReward(month),
            claimed: await this.instance.isMonthClaimed(month),
          };
        })
      );

      this.setState({ benefits });
    }
  };

  loadClaims = async () => {
    const claims = (await this.instance.queryFilter(this.instance.filters.Claim(null, null, null)))
      .map((log): [ethers.Event, ethers.utils.LogDescription] => [
        log,
        this.instance.interface.parseLog(log),
      ])
      .map((_) => {
        const [event, logDescription] = _;
        const claim: BenefitClaim = {
          nrtMonth: (logDescription.args[0] as ethers.BigNumber).toNumber(),
          amount: logDescription.args[1] as ethers.BigNumber,
          rewardType: logDescription.args[2] as 0 | 1 | 2,
          txHash: event.transactionHash,
        };
        return claim;
      });

    this.setState({ claims });
  };

  isMonthSelected = (month: number) => {
    return this.state.selectedMonths.includes(month);
  };

  toggleSelectionOfMonth = async (month: number) => {
    const selectedMonths = [...this.state.selectedMonths];

    if (this.isMonthSelected(month)) {
      // remove month
      const index = selectedMonths.indexOf(month);
      if (index > -1) {
        selectedMonths.splice(index, 1);
      }
    } else {
      // add month
      selectedMonths.push(month);
    }

    this.setState({ selectedMonths });
  };

  withdrawReward = async () => {
    this.setState({ spinner: true });

    const endState = {
      spinner: false,
      selectedMonths: this.state.selectedMonths,
      displayMessage: `Successfully ${this.state.rewardType !== 2 ? 'withdrawn' : 'restaked'}!`,
    };

    try {
      if (
        this.state.rewardType !== 0 &&
        this.state.rewardType !== 1 &&
        this.state.rewardType !== 2
      ) {
        throw new Error('Reward type is incorrect');
      }

      console.log(this.state.selectedMonths);
      // @ts-ignore
      window.sInstance = this.instance;
      const tx = await this.instance.withdrawMonthlyNRT(
        this.state.selectedMonths,
        this.state.rewardType
      );

      await tx.wait();

      // deselect months
      // endState.selectedMonths = []; // commenting to not deselect months
    } catch (error) {
      endState.displayMessage = `There was an error: ${error.message}`;
    }

    this.setState(endState);

    this.updateBenefits();
    this.loadClaims();
    this.props.refreshDetailsHook();
  };

  render() {
    const rewardTexts = [
      'Liquid+ReStake (0% IssTime)',
      'Prepaid+ReStake (100% IssTime)',
      'ReStake (225% IssTime)',
    ];

    const selectComponent = (
      <Card className="p-4 text-center">
        {this.state.selectedMonths.length > 0 || this.state.rewardType !== null ? (
          <>
            <p>Selected Months: [{this.state.selectedMonths.join(', ')}]</p>

            {this.state.rewardType !== null ? (
              <Alert variant="info">
                {(() => {
                  switch (this.state.rewardType) {
                    case 0:
                      return (
                        <>
                          You will get 50% of the amount in Liquid on your wallet, while 50% of the
                          amount will be rewarded as a topup on this staking. With this option you
                          do not get any IssTime Credit.
                        </>
                      );
                    case 1:
                      return (
                        <>
                          You will get 50% of the amount as Wrapped ES tokens (PrepaidES) on your
                          wallet, while 50% of the amount will be rewarded as a topup on this
                          staking. With this option you get 100% of the 50% reward as IssTime
                          Credit.
                        </>
                      );
                    case 2:
                      return (
                        <>
                          You will get this entire reward as a topup on this staking. With this
                          option you get 225% of the 50% reward as IssTime Credit.
                        </>
                      );
                  }
                })()}{' '}
                Also please note that after withdrawing current month's NRT rewards, you will not be
                eligible to start your IssTime for the month.
              </Alert>
            ) : null}

            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={
                this.state.rewardType === null
                  ? 'Select a reward type'
                  : rewardTexts[this.state.rewardType]
              }
            >
              {rewardTexts.map((rewardText, rewardType) => {
                if (rewardType === 0 || rewardType === 1 || rewardType === 2) {
                  return (
                    <Dropdown.Item key={rewardType} onClick={() => this.setState({ rewardType })}>
                      {rewardText}
                    </Dropdown.Item>
                  );
                }
                return null;
              })}
            </DropdownButton>

            {this.state.displayMessage ? (
              <Alert variant="info">{this.state.displayMessage}</Alert>
            ) : null}

            {this.state.rewardType !== null ? (
              <Button
                style={{ display: 'block', width: '200px', margin: 'auto' }}
                onClick={this.withdrawReward}
                disabled={this.state.spinner}
              >
                {this.state.spinner ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: '2px' }}
                    />
                    Please wait...
                  </>
                ) : this.state.rewardType !== 2 ? (
                  <>Withdraw</>
                ) : (
                  <>Restake</>
                )}
              </Button>
            ) : null}
          </>
        ) : (
          <p>Select NRT months from below to collectively withdraw your TimeAlly NRT reward.</p>
        )}
      </Card>
    );

    return (
      <div className="container dashboard-bg">
        {this.state.claims === null ? (
          <p>Loading withdraw claims history...</p>
        ) : this.state.claims.length ? (
          <>
            <h3>Withdraw Claim History</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>Claimed NRT month</th>
                  <th>Reward type</th>
                  <th>Amount</th>
                  <th>Tx hash</th>
                </tr>
              </thead>
              <tbody>
                {this.state.claims.map((claim, index) => (
                  <tr key={index}>
                    <td>{claim.nrtMonth}</td>
                    <td>{rewardTexts[claim.rewardType] ?? 'Unknown reward type'}</td>
                    <td>
                      {(() => {
                        switch (claim.rewardType) {
                          case 0:
                            return (
                              <>
                                {ethers.utils.formatEther(claim.amount.div(2))} ES
                                <br />
                                {ethers.utils.formatEther(claim.amount.div(2))} TopupES
                              </>
                            );
                          case 1:
                            return (
                              <>
                                {ethers.utils.formatEther(claim.amount.div(2))} PrepaidES
                                <br />
                                {ethers.utils.formatEther(claim.amount.div(2))} TopupES
                                <br />
                                {ethers.utils.formatEther(claim.amount.div(2))} ES IssTime Limit
                              </>
                            );
                          case 2:
                            return (
                              <>
                                {ethers.utils.formatEther(claim.amount)} TopupES
                                <br />
                                {ethers.utils.formatEther(claim.amount.div(2).div(100).mul(225))} ES
                                IssTime Limit
                              </>
                            );
                          default:
                            return <>Unknown reward type</>;
                        }
                      })()}
                    </td>
                    <td>
                      <a target="_blank" href={EraswapInfo.getTxHref(claim.txHash)}>
                        View tx on Eraswap.Info
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
          <p>No NRT claimed on this staking</p>
        )}

        {this.props.destroyStatus !== null ? (
          <Alert variant="danger">
            The staking contract is destroyed, so any pending NRT benefits withdraw cannot be
            executed.
          </Alert>
        ) : null}

        {this.monthsArray !== null ? (
          <>
            <h3>Withdraw NRT</h3>

            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                {selectComponent}
                <div className="wrapper-content-stack bg-white pinside10">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="row table-padding">
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>NRT Month</th>
                              <th>Monthly Benefit</th>
                              <th>Withdraw</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.monthsArray.map((month, i) => (
                              <tr key={i}>
                                <td>{month}</td>
                                <td>
                                  {this.state.benefits === null
                                    ? `Loading...`
                                    : this.state.benefits[i].amount
                                    ? `${ethers.utils.formatEther(
                                        this.state.benefits[i].amount ?? ethers.constants.Zero // Typescript bug
                                      )} ES${this.state.benefits[i].claimed ? ` (Claimed)` : ''}`
                                    : `NRT not released`}
                                </td>
                                <td>
                                  <div className="withdraw-data-flex">
                                    <Button
                                      variant={
                                        this.isMonthSelected(month) ? 'primary' : 'outline-primary'
                                      }
                                      disabled={
                                        this.state.benefits
                                          ? this.state.benefits[i].amount === null ||
                                            this.state.benefits[i].claimed
                                          : true
                                      }
                                      onClick={this.toggleSelectionOfMonth.bind(this, month)}
                                    >
                                      {this.state.benefits && this.state.benefits[i].claimed
                                        ? 'Already claimed'
                                        : this.isMonthSelected(month)
                                        ? 'Selected'
                                        : 'Select'}
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
                {selectComponent}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}
