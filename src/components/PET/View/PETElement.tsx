import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { hexToNum } from '../../../utils';

type Props ={
  petId: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
type State = {
  stakingTime: string,
  currentTime: number,
  commitmentAmount: number,
  nextDepositTimestamp: number,
  nextWithdrawTimestamp: number,
};

const ethers = require('ethers');

class PETElement extends Component<Props, State> {
  intervalId: NodeJS.Timeout | null = null;

  state: State = {
    stakingTime: 'Loading...',
    currentTime: Math.floor(Date.now()/1000),
    commitmentAmount: -1,
    nextDepositTimestamp: -1,
    nextWithdrawTimestamp: -1,
  };

  componentDidMount = async() => {
    const currentTime = /*process.env.network === 'homestead' ? */ Math.floor(Date.now() / 1000) // : (await window.esInstance.functions.mou()).toNumber();

    // // console.log(currentTime, Math.floor(Date.now() / 1000));
    if(window.wallet){
      console.log('this.props.petId',this.props.petId);

      const pet = await window.petInstance.pets(
        window.wallet?.address,
        this.props.petId
      );
      console.log(pet);
      const stakingTime = new Date(pet.initTimestamp.toNumber() * 1000).toLocaleString();
      const petPlan = await window.petInstance.petPlans(pet.planId);
      console.log(petPlan);
      const minimumMonthlyCommitmentAmount = petPlan.minimumMonthlyCommitmentAmount;
      const monthlyBenefitFactorPerThousand = petPlan.monthlyBenefitFactorPerThousand;
      const commitmentAmount = hexToNum(pet.monthlyCommitmentAmount);
      // const petPlanName = `${ethers.utils.formatEther(minimumMonthlyCommitmentAmount.mul(2))} ES / ${monthlyBenefitFactorPerThousand.toNumber()/10}%`;
      console.log('pet.initTimestamp',pet.initTimestamp);

      const nextWithdrawTimestamp = pet.initTimestamp.toNumber() + 12*2629744;
      let nextDepositTimestamp = pet.initTimestamp.toNumber();
      let i = 0;
      while(nextDepositTimestamp < currentTime) {
        nextDepositTimestamp += 2629744;
      }
      // 2629744
      this.setState({
        stakingTime,
        commitmentAmount,
        nextDepositTimestamp,
        nextWithdrawTimestamp,
        currentTime
      });

      this.intervalId = setInterval(() => {
        this.setState({ currentTime: this.state.currentTime + 1 });
      },1000);
    }
  };

  componentWillUnmount = () => {
    if(this.intervalId) clearInterval(this.intervalId);
  }

  getTimeRemaining = (totalSeconds: number) => {
    const days = Math.floor(totalSeconds/60/60/24);
    const hours = Math.floor((totalSeconds - days * 60 * 60 * 24) / 60 / 60);
    const minutes = Math.floor((totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
    const seconds = totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
    return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  }

  render = () => {

    return (
      <tr>
        <td>{this.props.petId}</td>
        <td>{this.state.stakingTime}</td>
        <td>
          {this.state.commitmentAmount}
          </td>
        <td>
          {this.state.nextDepositTimestamp ? this.getTimeRemaining(this.state.nextDepositTimestamp - this.state.currentTime) : 'Calculating...'}
          </td>
        <td>
          {this.state.nextWithdrawTimestamp ? this.getTimeRemaining(this.state.nextWithdrawTimestamp - this.state.currentTime) : 'Calculating...'}
          </td>
        <td><Button
        onClick={this.props.onClick}
        >Open PET</Button></td>
      </tr>
    );
  }
}

export default PETElement;
