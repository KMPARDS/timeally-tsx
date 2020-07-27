import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Form, Alert, Button, Spinner } from 'react-bootstrap';
import { ethers } from 'ethers';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  valueInput: string;
  spinner: boolean;
  displayMessage: string;
};

export class Split extends Component<Props, State> {
  state: State = {
    valueInput: '',
    spinner: false,
    displayMessage: '',
  };

  split = async () => {
    this.setState({ spinner: true, displayMessage: '' });
    try {
      const tx = await this.props.instance.split(ethers.utils.parseEther(this.state.valueInput));
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
          You can split the your staking in to two stakings. When splitting, there are two kinds on
          contracts, master and child. The contract which is used to create a split is master
          staking contract and the new contract which is created is called child staking contract.
          When child splits from master, it takes proportional IssTime with it however all the
          unclaimed rewards stay with the master. You should not have delegation when you are
          splitting. Child is a new staking contract that is deployed which starts to get NRT
          rewards from next month.
        </p>
        <Form.Control
          onChange={(event) => this.setState({ valueInput: event.target.value })}
          value={this.state.valueInput}
          type="text"
          placeholder="Enter value of child split"
          style={{ width: '325px' }}
          autoComplete="off"
        />

        {this.state.displayMessage ? (
          <Alert variant="info">{this.state.displayMessage}</Alert>
        ) : null}

        <Button onClick={this.split} disabled={this.state.spinner}>
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
          {this.state.spinner ? 'Splitting...' : 'Split staking'}
        </Button>
      </>
    );
  }
}
