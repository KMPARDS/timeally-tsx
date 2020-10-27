import React, { Component } from 'react';
import { Layout } from '../Layout';
import { BigNumber } from 'ethers';
import { formatEther, isAddress } from 'ethers/lib/utils';
import { routine } from '../../utils';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import type { Variant } from 'react-bootstrap/types';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';

type State = {
  display: { message: string; variant: Variant } | null;
  rewards: BigNumber | null;
  stakingAddressInput: string;
  spinner: boolean;
};

export class PromotionalRewards extends Component<{}, State> {
  state: State = {
    display: null,
    rewards: null,
    stakingAddressInput: '',
    spinner: false,
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

  withdraw = async () => {
    this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet not loaded');
      }

      const tx = await window.timeallyPromotionalBucketInstance
        .connect(window.wallet)
        .claimReward(this.state.stakingAddressInput);
      await tx.wait();

      this.setState({
        display: {
          message:
            'The claim was successful. Please visit the staking topup page to see topup history',
          variant: 'success',
        },
        spinner: false,
      });
    } catch (error) {
      this.setState({
        display: { message: parseEthersJsError(error), variant: 'danger' },
        spinner: false,
      });
    }
  };

  render() {
    return (
      <Layout title="Promotional Rewards">
        <p>
          When you receive promotional rewards from smart contracts, it will appear here. Please
          note that, if you are looking for previous rewards from TimeAlly, they are distributed as
          Prepaid ES tokens (WES) and you can see them in Wallet tab.
        </p>

        {window.wallet ? (
          <p>
            Your pending rewards:{' '}
            {this.state.rewards !== null ? formatEther(this.state.rewards) + ' ES' : 'Loading...'}
          </p>
        ) : null}

        {this.state.rewards !== null && this.state.rewards.gt(0) ? (
          <Card>
            <Card.Body>
              <p>
                Withdraw the reward as a topup on any of your staking. Please make sure that you are
                entering address of a staking that you own.
              </p>
              <Form.Control
                className="align-items-center"
                onChange={(event) => this.setState({ stakingAddressInput: event.target.value })}
                value={this.state.stakingAddressInput}
                type="text"
                placeholder="Enter address of your staking"
                autoComplete="off"
                isInvalid={
                  !!this.state.stakingAddressInput && !isAddress(this.state.stakingAddressInput)
                }
              />
              <Button disabled={this.state.spinner} onClick={this.withdraw}>
                {this.state.spinner ? 'Withdrawing' : 'Withdraw'}
              </Button>
            </Card.Body>
          </Card>
        ) : null}

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
