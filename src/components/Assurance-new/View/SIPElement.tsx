import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getTimeRemaining } from '../../../utils';

type State = {
  stakingTime: string;
  currentTime: number;
  sipPlanName: string;
  nextDepositTimestamp: number;
  nextWithdrawTimestamp: number;
};

type Props = {
  sipId: number;
  monthlyCommitmentAmount: number;
  onClick: () => void;
};

class SIPElement extends Component<Props, State> {
  intervalId: any;
  state: State = {
    stakingTime: 'Loading...',
    currentTime: Math.floor(Date.now() / 1000),
    sipPlanName: '',
    nextDepositTimestamp: Math.floor(Date.now() / 1000),
    nextWithdrawTimestamp: Math.floor(Date.now() / 1000),
  };

  componentDidMount = async () => {
    if (window.wallet) {
      const sip = await window.tsgapLiquidInstance.functions.sips(
        window.wallet?.address,
        this.props.sipId
      );
      console.log(sip);
      const stakingTime = new Date(sip.stakingTimestamp * 1000).toLocaleString();
      const sipPlan = await window.tsgapLiquidInstance.functions.sipPlans(sip.planId);
      console.log(sipPlan);
      const accumulationPeriodMonths = sipPlan.accumulationPeriodMonths;
      const benefitPeriodYears = sipPlan.benefitPeriodYears;
      const gracePeriodSeconds = sipPlan.gracePeriodSeconds;
      const sipPlanName = `${accumulationPeriodMonths} Months / ${benefitPeriodYears} Years`;
      const nextWithdrawTimestamp = sip.stakingTimestamp + accumulationPeriodMonths * 2629744;
      let nextDepositTimestamp = sip.stakingTimestamp;
      let i = 0;
      while (nextDepositTimestamp < Math.floor(Date.now() / 1000)) {
        nextDepositTimestamp += 2629744;
      }
      // 2629744
      this.setState({ stakingTime, sipPlanName, nextDepositTimestamp, nextWithdrawTimestamp });

      this.intervalId = setInterval(() => {
        this.setState({ currentTime: Math.floor(Date.now() / 1000) });
      }, 1000);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render = () => {
    return (
      <tr>
        <td>{this.props.sipId}</td>
        <td>{this.state.stakingTime}</td>
        <td>{this.state.sipPlanName}</td>
        <td>{this.props.monthlyCommitmentAmount} ES</td>
        <td>
          {this.state.nextDepositTimestamp
            ? getTimeRemaining(this.state.nextDepositTimestamp - this.state.currentTime)
            : 'Calculating...'}
        </td>
        <td>
          {this.state.nextWithdrawTimestamp
            ? getTimeRemaining(this.state.nextWithdrawTimestamp - this.state.currentTime)
            : 'Calculating...'}
        </td>
        <td>
          <Button onClick={this.props.onClick}>View SIP</Button>
        </td>
      </tr>
    );
  };
}

export default SIPElement;
