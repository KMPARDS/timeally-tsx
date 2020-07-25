import React, { Component } from 'react';
import { Table, Button, DropdownButton, Dropdown, Card, Alert, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import '../Stakings.css';

type Props = {
  instance: TimeAllyStaking;
  startMonth: number;
  endMonth: number;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  currentMonth: number | null;
  benefits: { amount: ethers.BigNumber | null; claimed: boolean }[] | null;
  selectedMonths: number[];
  rewardType: 0 | 1 | 2 | null;
  spinner: boolean;
  displayMessage: string;
};

export class Withdraw extends Component<Props, State> {
  state: State = {
    currentMonth: null,
    benefits: null,
    selectedMonths: [],
    rewardType: null,
    spinner: false,
    displayMessage: '',
  };

  instance = this.props.instance;
  monthsArray = Object.keys([...Array(this.props.endMonth - this.props.startMonth + 1)]).map(
    (n) => +n + this.props.startMonth
  );

  componentDidMount = async () => {
    await this.updateNrtMonth();
    await this.updateBenefits();
  };

  updateNrtMonth = async () => {
    const currentMonth = await window.nrtManagerInstance.currentNrtMonth();

    this.setState({ currentMonth: currentMonth.toNumber() });
  };

  updateBenefits = async () => {
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
      displayMessage: 'Successfully withdrawn!',
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
      endState.selectedMonths = [];
    } catch (error) {
      endState.displayMessage = `There was an error: ${error.message}`;
    }

    this.setState(endState);

    this.updateBenefits();
    this.props.refreshDetailsHook();
  };

  render() {
    const rewardTexts = [
      'Liquid+ReStake (0% IssTime)',
      'Prepaid+ReStake (100% IssTime)',
      'ReStake (225% IssTime)',
    ];

    const selectComponent = (
      <Card className="my-4 p-4 text-center">
        {this.state.selectedMonths.length > 0 || this.state.rewardType !== null ? (
          <>
            <p>Selected Months: [{this.state.selectedMonths.join(', ')}]</p>

            {this.state.displayMessage ? (
              <Alert variant="info">{this.state.displayMessage}</Alert>
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
                    Withdrawing
                  </>
                ) : (
                  <>Withdraw</>
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
      </div>
    );
  }
}
