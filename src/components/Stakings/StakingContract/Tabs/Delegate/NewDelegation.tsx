import React, { Component } from 'react';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';
import { Form, DropdownButton, Dropdown, Alert, Button, Spinner, Card, Col } from 'react-bootstrap';
import { ethers } from 'ethers';
import { isValidAmountInput } from '../../../../../utils';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
};

type State = {
  platform: string;
  delegateeInput: string;
  monthsInput: string;
  displayMesssage: string;
  spinner: boolean;
};

export class NewDelegation extends Component<Props, State> {
  state: State = {
    platform: '',
    delegateeInput: '',
    monthsInput: '',
    displayMesssage: '',
    spinner: false,
  };

  delegate = async () => {
    this.setState({ spinner: true, displayMesssage: '' });
    try {
      const tx = await this.props.instance.delegate(
        this.state.platform,
        this.state.delegateeInput,
        this.state.monthsInput.split(' ').join('').split(',')
      );
      await tx.wait();
      this.setState({ spinner: false, displayMesssage: 'Success' });
    } catch (error) {
      this.setState({
        displayMesssage: `Error from smart contract: ${error.message}`,
        spinner: false,
      });
    }
    await this.props.refreshDetailsHook();
  };

  render() {
    const isValidMonths = (input: string) => {
      const results = input.split(' ').join('').split(',').map(isValidAmountInput);
      return !results.filter((result) => !result).length;
    };

    return (
      <Card className="p-4 delegate-page">
        <h3>New Delegation</h3>

        <DropdownButton
          id="dropdown-basic-button"
          variant="secondary"
          title={this.state.platform || 'Select platform'}
        >
          <Dropdown.Item
            className="break"
            onClick={() => this.setState({ platform: window.validatorManagerInstance.address })}
          >
            Validator Manager {window.validatorManagerInstance.address}
          </Dropdown.Item>
        </DropdownButton>

        <Form>
          <Form.Row className="align-items-center">
            <Col xs="auto" className="my-1">
              <Form.Control
                className="align-items-center"
                onChange={(event) => this.setState({ monthsInput: event.target.value })}
                value={this.state.monthsInput}
                type="text"
                placeholder="Enter Months e.g. 4,5,6"
                autoComplete="off"
                isValid={!!this.state.monthsInput && isValidMonths(this.state.monthsInput)}
                isInvalid={!!this.state.monthsInput && !isValidMonths(this.state.monthsInput)}
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Control
                className="align-items-center"
                onChange={(event) => this.setState({ monthsInput: event.target.value })}
                value={this.state.monthsInput}
                type="text"
                placeholder="Enter Months e.g. 4,5,6"
                autoComplete="off"
                isValid={!!this.state.monthsInput && isValidMonths(this.state.monthsInput)}
                isInvalid={!!this.state.monthsInput && !isValidMonths(this.state.monthsInput)}
              />

              {this.state.displayMesssage ? (
                <Alert variant="info">{this.state.displayMesssage}</Alert>
              ) : null}
            </Col>
            <Col xs="auto" className="my-1">
              <Button onClick={this.delegate} disabled={this.state.spinner}>
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
                {this.state.spinner ? 'Delegating...' : 'Delegate'}
              </Button>
            </Col>
          </Form.Row>
        </Form>

        {/* <Form.Control
          onChange={(event) => this.setState({ delegateeInput: event.target.value })}
          value={this.state.delegateeInput}
          type="text"
          placeholder="Enter Delegatee Address"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={!!this.state.delegateeInput && ethers.utils.isAddress(this.state.delegateeInput)}
          isInvalid={
            !!this.state.delegateeInput && !ethers.utils.isAddress(this.state.delegateeInput)
          }
        />

        <Form.Control
          onChange={(event) => this.setState({ monthsInput: event.target.value })}
          value={this.state.monthsInput}
          type="text"
          placeholder="Enter Months e.g. 4,5,6"
          style={{ width: '325px' }}
          autoComplete="off"
          isValid={!!this.state.monthsInput && isValidMonths(this.state.monthsInput)}
          isInvalid={!!this.state.monthsInput && !isValidMonths(this.state.monthsInput)}
        />

        {this.state.displayMesssage ? (
          <Alert variant="info">{this.state.displayMesssage}</Alert>
        ) : null}

        <Button onClick={this.delegate} disabled={this.state.spinner}>
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
          {this.state.spinner ? 'Delegating...' : 'Delegate'}
        </Button> */}
      </Card>
    );
  }
}
