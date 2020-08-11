import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Alert, Form, Button, Spinner, Col } from 'react-bootstrap';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
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
        <h3>Transfer</h3>
        <p>
          Your staking contract is ERC-173 compliant, which means that you can transfer the
          ownership of this smart contract to any other person or a multi-sig wallet. On
          transferring the staking, the staking is transferred in current state as is. Meaning, all
          the unclaimed benefits, topup, issTime, delegation is also included in the transfer.
        </p>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto" className="my-1">
              <Form.Control
                className="align-items-center"
                onChange={(event) => this.setState({ addressInput: event.target.value })}
                value={this.state.addressInput}
                type="text"
                placeholder="Enter new owner address"
                autoComplete="off"
              />

              {this.state.displayMessage ? (
                <Alert variant="info">{this.state.displayMessage}</Alert>
              ) : null}

              {this.props.destroyStatus !== null ? (
                <Alert variant="danger">
                  The staking contract is destroyed, so a transfer ownership transaction cannot be
                  executed.
                </Alert>
              ) : null}
            </Col>

            <Col xs="auto" className="my-1">
              <Button
                onClick={this.transferOwnership}
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
                {this.state.spinner ? 'Transferring...' : 'Transfer staking'}
              </Button>
            </Col>
          </Form.Row>
        </Form>
        {/* <Form.Control className="align-items-center"
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
          
                  {this.props.destroyStatus !== null ? (
                    <Alert variant="danger">
                      The staking contract is destroyed, so a transfer ownership transaction cannot be
                      executed.
                    </Alert>
                  ) : null}
                      <Button
                              onClick={this.transferOwnership}
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
                              {this.state.spinner ? 'Transferring...' : 'Transfer staking'}
                            </Button> */}
      </>
    );
  }
}
