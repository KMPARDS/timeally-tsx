import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import '../Stakings.css';

type Props = {
  instance: TimeAllyStaking;
  startMonth: number;
  endMonth: number;
};

type State = {
  currentMonth: number | null;
  benefits: { amount: ethers.BigNumber | null; claimed: boolean }[] | null;
};

export class Withdraw extends Component<Props, State> {
  state: State = {
    currentMonth: null,
    benefits: null,
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

        // try {
        return {
          amount: await this.instance.getMonthlyReward(month),
          claimed: await this.instance.isMonthClaimed(month),
        };
        // } catch {
        //   return null;
        // }
      })
    );

    this.setState({ benefits });
  };

  render() {
    return (
      <div className="container dashboard-bg">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="wrapper-content-stack bg-white pinside10">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row table-padding">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>NRT Month</th>
                          <th>Monthly Benefits</th>
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
                                <a className="pink-btn-with">WITHDRAW</a>
                                <a className="btn btn-default main-btn-blue">RESTAKE </a>
                                <a className="btn  border-conv">CONVERT TO WES</a>
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
          </div>
        </div>
      </div>
    );
  }
}
