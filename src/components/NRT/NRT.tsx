import React, { Component } from 'react';
import { Layout } from '../Layout';
import { BigNumber } from 'ethers';
import { formatEther, isAddress, parseEther } from 'ethers/lib/utils';
import { isValidAmountInput, routine } from '../../utils';
import { Alert, Button, Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import type { Variant } from 'react-bootstrap/types';
import { parseEthersJsError } from 'eraswap-sdk/dist/utils';

type State = {
  display: { message: string; variant: Variant } | null;
  amountInput: string;
  poolSelect: null | 'Burn Pool' | 'Luck Pool';
  spinner: boolean;
};

export class NRT extends Component<{}, State> {
  state: State = {
    display: null,
    amountInput: '',
    poolSelect: null,
    spinner: false,
  };

  // intervalIds: NodeJS.Timeout[] = [];

  // componentDidMount = () => {
  //   this.intervalIds.push(routine(this.updateDetails, 8000));
  // };

  // componentWillUnmount = () => {
  //   this.intervalIds.forEach(clearInterval);
  // };

  addToPool = async () => {
    this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet not loaded');
      }

      if (this.state.poolSelect === null) {
        throw new Error('Pool not selected');
      }

      const tx = await window.nrtManagerInstance
        .connect(window.wallet)
        [this.state.poolSelect === 'Burn Pool' ? 'addToBurnPool()' : 'addToLuckPool()']({
          value: parseEther(this.state.amountInput),
        });
      await tx.wait();

      this.setState({
        display: {
          message: `Tx sent! Hash: ${tx.hash}`,
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
      <Layout title="NRT Manager">
        <p>This screen is used to add tokens to Burn pool or Luck Pool of NRT contract.</p>
        <Card>
          <Card.Body>
            <p>
              Select whether you want to send your tokens to Burn pool for burning or Luck pool for
              distribution to community.
            </p>
            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={this.state.poolSelect ?? 'Select Pool'}
            >
              {['Burn Pool', 'Luck Pool'].map((pool) => (
                <Dropdown.Item
                  className="break"
                  onClick={() =>
                    this.setState({ poolSelect: (pool as unknown) as 'Burn Pool' | 'Luck Pool' })
                  }
                >
                  {pool}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Form.Control
              className="align-items-center"
              onChange={(event) => this.setState({ amountInput: event.target.value })}
              value={this.state.amountInput}
              type="text"
              placeholder="Enter amount to send to pool"
              autoComplete="off"
              isInvalid={!!this.state.amountInput && !isValidAmountInput(this.state.amountInput)}
            />
            <Button disabled={this.state.spinner} onClick={this.addToPool}>
              {this.state.spinner ? 'Sending...' : 'Send'}
            </Button>
          </Card.Body>
        </Card>

        {this.state.display !== null ? (
          <Alert variant={this.state.display.variant}>{this.state.display.message}</Alert>
        ) : null}
      </Layout>
    );
  }
}
