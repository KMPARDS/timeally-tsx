import React, { Component } from 'react';
import { Layout } from '../Layout';
import { BigNumber } from 'ethers';
import { routine } from '../../utils';
import { Alert } from 'react-bootstrap';
import type { Variant } from 'react-bootstrap/types';
import { formatEther } from 'ethers/lib/utils';

type State = {
  display: { message: string; variant: Variant } | null;
  rewards: BigNumber | null;
};

export class PromotionalRewards extends Component<{}, State> {
  state: State = {
    display: null,
    rewards: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateDetails, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  updateDetails = async () => {
    try {
      if (!window.wallet) {
        throw new Error('Wallet not loaded');
      }
      const rewards = await window.timeallyPromotionalBucketInstance.stakingRewards(
        window.wallet.address
      );
      this.setState({
        rewards,
      });
    } catch (error) {
      this.setState({
        display: { message: error.message, variant: 'danger' },
      });
    }
  };

  render() {
    return (
      <Layout title="Promotional Rewards">
        <p>When you receive promotional rewards from smart contracts, it will appear here.</p>

        <p>
          Your pending rewards:{' '}
          {this.state.rewards !== null ? formatEther(this.state.rewards) + ' ES' : 'Loading...'}
        </p>

        {this.state.display !== null ? (
          <Alert variant={this.state.display.variant}>{this.state.display.message}</Alert>
        ) : null}

        <p>
          To get more rewards, just get your KYC approved on Kyc Dapp smart contract on Era Swap
          Network, then the smart contract allocates ES to your wallet as a promotional incentive.
        </p>
      </Layout>
    );
  }
}
