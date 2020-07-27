import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Alert, Form, Button, Spinner } from 'react-bootstrap';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  addressInput: string;
  spinner: boolean;
  displayMessage: string;
};

export class Transfer extends Component<Props, State> {
  state: State = {
    addressInput: '',
    spinner: false,
    displayMessage: '',
  };

  transferOwnership = async () => {
    this.setState({ spinner: true, displayMessage: '' });
    try {
      const tx = await this.props.instance.transferOwnership(this.state.addressInput);
      await tx.wait();
      this.setState({ spinner: false, displayMessage: 'Success!' });
      this.props.refreshDetailsHook();
    } catch (error) {
      this.setState({ displayMessage: error.message, spinner: false });
    }
  };

  render() {
    return (
      <>
        <p>
          Your staking contract is ERC-173 compliant, which means that you can transfer the
          ownership of this smart contract to any other person or a multi-sig wallet. On
          transferring the staking, the staking is transferred in current state as is. Meaning, all
          the unclaimed benefits, topup, issTime, delegation is also included in the transfer.
        </p>

        <Form.Control
          onChange={(event) => this.setState({ addressInput: event.target.value })}
          value={this.state.addressInput}
          type="text"
          placeholder="Enter new owner address"
          style={{ width: '325px' }}
          autoComplete="off"
        />

        {this.state.displayMessage ? (
          <Alert variant="info">{this.state.displayMessage}</Alert>
        ) : null}

        <Button onClick={this.transferOwnership} disabled={this.state.spinner}>
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
          {this.state.spinner ? 'Transferring...' : 'Transfer staking'}
        </Button>
      </>
    );
  }
}
