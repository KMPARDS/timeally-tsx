import React, { Component } from 'react';
import { ethers } from 'ethers';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { TimeAllyStaking } from 'eraswap-sdk/dist/typechain/ESN';
import { renderEthersJsError } from '../../../../../utils';
import { AddressDisplayer } from '../../../../../AddressDisplayer';

export interface Delegation {
  month: number;
  platform: string;
  delegatee: string;
}

type Props = {
  instance: TimeAllyStaking;
  delegation: Delegation;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  spinner: boolean;
  displayMessage: string;
};

export class DelegationElement extends Component<Props, State> {
  state: State = {
    spinner: false,
    displayMessage: '',
  };

  withdrawBenefit = async () => {
    this.setState({
      spinner: true,
      displayMessage: '',
    });
    try {
      const tx = await window.validatorManagerInstance
        .connect(window.wallet?.connect(window.provider) ?? window.provider)
        .withdrawDelegationShare(
          this.props.delegation.month,
          this.props.delegation.delegatee,
          this.props.instance.address
        );
      await tx.wait();
      this.setState({ spinner: false, displayMessage: 'Success' });
    } catch (error) {
      this.setState({
        displayMessage: renderEthersJsError(error),
        spinner: false,
      });
    }
  };

  render() {
    return (
      <>
        <tr>
          <td>{this.props.delegation.month}</td>
          <td>
            <AddressDisplayer address={this.props.delegation.platform} />
          </td>
          <td>
            <AddressDisplayer address={this.props.delegation.delegatee} />
          </td>
          <td>
            {this.state.displayMessage ? (
              <Alert variant="info">{this.state.displayMessage}</Alert>
            ) : null}
            <Button
              onClick={this.withdrawBenefit.bind(
                this,
                this.props.delegation.month,
                this.props.delegation.delegatee
              )}
              disabled={this.state.spinner}
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
              {this.state.spinner ? 'Withdrawing...' : 'Withdraw Benefit'}
            </Button>
          </td>
        </tr>
      </>
    );
  }
}
