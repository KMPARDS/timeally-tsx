import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


const ethers = require('ethers');

class PETElement extends Component {
  state = {
    stakingTime: 'Loading...',
    currentTime: Math.floor(Date.now()/1000)
  };

  componentDidMount = async() => {
    const currentTime = process.env.network === 'homestead' ? Math.floor(Date.now() / 1000) : (await window.esInstance.functions.mou()).toNumber();

    // console.log(currentTime, Math.floor(Date.now() / 1000));

    const pet = await window.petInstance.functions.pets(
      window.walletInstance.address,
      this.props.petId
    );
    console.log(pet);
    const stakingTime = new Date(pet.initTimestamp.toNumber() * 1000).toLocaleString();
    const petPlan = await window.petInstance.functions.petPlans(pet.planId);
    console.log(petPlan);
    const minimumMonthlyCommitmentAmount = petPlan.minimumMonthlyCommitmentAmount;
    const monthlyBenefitFactorPerThousand = petPlan.monthlyBenefitFactorPerThousand;
    const commitmentAmount = window.lessDecimals(pet.monthlyCommitmentAmount);
    // const petPlanName = `${ethers.utils.formatEther(minimumMonthlyCommitmentAmount.mul(2))} ES / ${monthlyBenefitFactorPerThousand.toNumber()/10}%`;
    const nextWithdrawTimestamp = pet.initTimestamp.toNumber() + 12*2629744;
    let nextDepositTimestamp = pet.initTimestamp.toNumber();
    let i = 0;
    while(nextDepositTimestamp < currentTime) {
      nextDepositTimestamp += 2629744;
    }
    // 2629744
    this.setState({ stakingTime, commitmentAmount, nextDepositTimestamp, nextWithdrawTimestamp, currentTime });

    this.intervalId = setInterval(() => {
      this.setState({ currentTime: this.state.currentTime + 1 });
    },1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  render = () => {

    return (
      <tr>
        <td>{this.props.petId}</td>
        <td>{this.state.stakingTime}</td>
        <td>{this.state.commitmentAmount}</td>
        <td>{this.state.nextDepositTimestamp ? window.getTimeRemaining(this.state.nextDepositTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td>{this.state.nextWithdrawTimestamp ? window.getTimeRemaining(this.state.nextWithdrawTimestamp - this.state.currentTime) : 'Calculating...'}</td>
        <td><Button onClick={this.props.onClick}>Open PET</Button></td>
      </tr>
    );
  }
}

export default PETElement;
