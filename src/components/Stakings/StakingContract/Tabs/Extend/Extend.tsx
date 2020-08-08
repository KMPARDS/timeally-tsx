import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  spinner: boolean;
  displayMessage: string;
};

export class Extend extends Component<Props, State> {
  state: State = {
    spinner: false,
    displayMessage: '',
  };

  extendStaking = async () => {
    this.setState({ spinner: true, displayMessage: '' });
    try {
      const tx = await this.props.instance.extend();
      await tx.wait();
      this.setState({ spinner: false, displayMessage: 'Success!' });
      this.props.refreshDetailsHook();
    } catch (error) {
      this.setState({ displayMessage: error.message, spinner: false });
    }
  };

  render() {
    return (
      <Card className="p-4">
        <h3>Extend</h3>
        <p>
          To retain efficiency on Blockchain, stakings data is mapped for upto 12 NRT Months for
          receiving NRT rewards. You only need to press the below button once or more times every
          year. It will extend your staking expiry for next 12 NRT months. If you do not extend your
          staking before the expiry (within 12 NRT months), it you will not be able to extend it
          after that, and you will stop receiving NRT rewards or will be able to delegate
          (basically, it will render useless). So simply press the below button, once in a year or
          more times as per your wish.
        </p>

        {this.state.displayMessage ? (
          <Alert variant="info">{this.state.displayMessage}</Alert>
        ) : null}

        {this.props.destroyStatus !== null ? (
          <Alert variant="danger">
            The staking contract is destroyed, so you cannot execute an extension transaction.
          </Alert>
        ) : null}

        <Button
          onClick={this.extendStaking}
          disabled={this.state.spinner || this.props.destroyStatus !== null}
        >
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
          {this.state.spinner ? 'Extending...' : 'Extend staking'}
        </Button>
      </Card>
    );
  }
}
