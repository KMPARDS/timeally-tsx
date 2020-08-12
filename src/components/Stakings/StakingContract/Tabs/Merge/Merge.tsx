import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Alert, Form, Button, Spinner, Col } from 'react-bootstrap';
import { ethers } from 'ethers';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  masterStakingInput: string;
  spinner: boolean;
  displayMessage: string;
};

export class Merge extends Component<Props, State> {
  state: State = {
    masterStakingInput: '',
    spinner: false,
    displayMessage: '',
  };

  mergeIn = async () => {
    this.setState({ spinner: true, displayMessage: '' });
    try {
      const tx = await this.props.instance.mergeIn(this.state.masterStakingInput);
      await tx.wait();
      this.setState({ spinner: false, displayMessage: 'Success' });
    } catch (error) {
      this.setState({
        displayMessage: `Error from smart contract: ${error.message}`,
        spinner: false,
      });
    }
  };

  render() {
    return (
      <>
        <h3>Merge</h3>

        <p>
          You can merge a staking into other staking. When a merge is taking place, there is a slave
          contract and a master contract. Slave contract merges inside master by transferring it's
          principal amount and issTime to the master contract. After the transfer, the slave
          contract gets destroyed.
        </p>

        <Alert variant="warning">
          Please withdraw all your monthly NRT rewards on this staking since monthly NRT rewards are
          not included during a staking merge. If you do not withdraw them before merging, those
          rewards will be lost forever.
        </Alert>
        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto" className="my-1">
              <Form.Control
                className="align-items-center"
                onChange={(event) => this.setState({ masterStakingInput: event.target.value })}
                value={this.state.masterStakingInput}
                type="text"
                placeholder="Enter Master Staking Contract Address"
                autoComplete="off"
                isValid={
                  !!this.state.masterStakingInput &&
                  ethers.utils.isAddress(this.state.masterStakingInput)
                }
                isInvalid={
                  !!this.state.masterStakingInput &&
                  !ethers.utils.isAddress(this.state.masterStakingInput)
                }
              />

              {this.state.displayMessage ? (
                <Alert variant="info">{this.state.displayMessage}</Alert>
              ) : null}

              {this.props.destroyStatus !== null ? (
                <Alert variant="danger">
                  The staking contract is destroyed, so you cannot execute a merge transaction.
                </Alert>
              ) : null}
            </Col>

            <Col xs="auto" className="my-1">
              <Button
                onClick={this.mergeIn}
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
                {this.state.spinner ? 'Merging in...' : 'Merge in'}
              </Button>
            </Col>
          </Form.Row>
        </Form>

        {/* 
            
        <Form.Control
          onChange={(event) => this.setState({ masterStakingInput: event.target.value })}
          value={this.state.masterStakingInput}
          type="text"
          placeholder="Enter Master Staking Contract Address"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={
            !!this.state.masterStakingInput && ethers.utils.isAddress(this.state.masterStakingInput)
          }
          isInvalid={
            !!this.state.masterStakingInput &&
            !ethers.utils.isAddress(this.state.masterStakingInput)
          }
        />

        {this.state.displayMessage ? (
          <Alert variant="info">{this.state.displayMessage}</Alert>
        ) : null}

        {this.props.destroyStatus !== null ? (
          <Alert variant="danger">
            The staking contract is destroyed, so you cannot execute a merge transaction.
          </Alert>
        ) : null}

        <Button
          onClick={this.mergeIn}
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
          {this.state.spinner ? 'Merging in...' : 'Merge in'}
        </Button> */}
      </>
    );
  }
}
