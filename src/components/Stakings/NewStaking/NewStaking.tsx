import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Spinner, Alert, DropdownButton, Dropdown } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Layout } from '../../Layout';

type State = {
  amount: string;
  liquidBalance: ethers.BigNumber | null;
  prepaidBalance: ethers.BigNumber | null;
  type: 'liquid' | 'prepaid' | null;
  spinner: boolean;
  displayMessage: string;
};

export class NewStaking extends Component<{}, State> {
  state: State = {
    amount: '',
    liquidBalance: null,
    prepaidBalance: null,
    type: null,
    spinner: false,
    displayMessage: '',
  };

  componentDidMount = async () => {
    this.updateBalances();
  };

  updateBalances = async () => {
    if (!window.wallet) {
      return alert('Wallet not loaded');
    }
    const liquidBalancePromise = window.provider.getBalance(window.wallet.address);
    const prepaidBalancePromise = window.prepaidEsInstance.balanceOf(window.wallet.address);

    this.setState({
      liquidBalance: await liquidBalancePromise,
      prepaidBalance: await prepaidBalancePromise,
    });
  };

  stake = async () => {
    this.setState({ spinner: true, displayMessage: '' });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }

      if (this.state.amount === '') {
        throw new Error('Please enter amount to stake');
      }

      let receipt: ethers.ContractReceipt;
      if (this.state.type === 'liquid') {
        const tx = await window.timeallyManagerInstance.connect(window.wallet).stake({
          value: ethers.utils.parseEther(this.state.amount),
        });
        receipt = await tx.wait();
      } else if (this.state.type === 'prepaid') {
        const tx = await window.prepaidEsInstance
          .connect(window.wallet)
          .transfer(
            window.timeallyManagerInstance.address,
            ethers.utils.parseEther(this.state.amount)
          );
        receipt = await tx.wait();
      } else {
        throw new Error('Please select type');
      }

      const filter = window.timeallyManagerInstance.filters.StakingTransfer(null, null, null);
      let stakingAddress: string = '';
      if (filter.topics) {
        const log = receipt.logs.find((log) => {
          // @ts-ignore
          return log.topics[0] === filter.topics[0];
        });

        if (log) {
          const parsedLog = window.timeallyManagerInstance.interface.parseLog(log);
          stakingAddress = parsedLog.args[2];
        }
      }
      this.setState({ spinner: false, displayMessage: stakingAddress || 'Success' });
    } catch (error) {
      this.setState({ spinner: false, displayMessage: error.message });
    }
  };

  render() {
    // checks if user's arbitary input is a valid ES value
    let isAmountValid = false;
    try {
      ethers.utils.parseEther(this.state.amount); // also throws for empty string
      isAmountValid = true;
    } catch {}

    const sufficientLiquid: boolean | null =
      isAmountValid && // needed else below parseEther will throw
      this.state.liquidBalance &&
      this.state.liquidBalance.gte(ethers.utils.parseEther(this.state.amount));

    const sufficientPrepaid: boolean | null =
      isAmountValid && // needed else below parseEther will throw
      this.state.prepaidBalance &&
      this.state.prepaidBalance.gte(ethers.utils.parseEther(this.state.amount));

    const showAmountError: boolean =
      !!this.state.amount && (!isAmountValid || (!sufficientLiquid && !sufficientPrepaid));

    const { spinner } = this.state;

    return (
      <Layout title="New Staking">
        <Card>
          <Form
            className="mnemonics custom-width"
            style={{
              border: '1px solid rgba(0,0,0,.125)',
              borderRadius: '.25rem',
              padding: '20px 40px',
              margin: '15px auto',
            }}
          >
            <h3 style={{ marginBottom: '15px' }}>New Staking</h3>
            {!ethers.utils.isAddress(this.state.displayMessage) ? (
              <>
                <Form.Group controlId="stakingAmount">
                  <Form.Control
                    className="stakingInput"
                    onChange={(event) => this.setState({ amount: event.target.value })}
                    value={this.state.amount}
                    type="text"
                    placeholder="Enter amount to stake"
                    style={{ width: '325px' }}
                    autoComplete="off"
                    isInvalid={showAmountError}
                  />
                  {showAmountError ? (
                    <Alert variant="danger">
                      {!isAmountValid ? (
                        <>Please enter a valid amount</>
                      ) : (
                        <>
                          Insufficient balance. Your liquid balance is{' '}
                          {this.state.liquidBalance
                            ? ethers.utils.formatEther(this.state.liquidBalance) + ' ES'
                            : 'Loading...'}
                          . Your prepaid balance is{' '}
                          {this.state.prepaidBalance
                            ? ethers.utils.formatEther(this.state.prepaidBalance) + ' ES'
                            : 'Loading...'}
                        </>
                      )}
                    </Alert>
                  ) : null}
                </Form.Group>

                <DropdownButton
                  id="dropdown-basic-button"
                  variant="secondary"
                  title={this.state.type === null ? 'Select type' : this.state.type}
                >
                  <Dropdown.Item onClick={() => this.setState({ type: 'liquid' })}>
                    Liquid
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setState({ type: 'prepaid' })}>
                    Prepaid
                  </Dropdown.Item>
                </DropdownButton>

                {this.state.displayMessage ? (
                  <Alert variant="info">{this.state.displayMessage}</Alert>
                ) : null}

                <Button variant="primary" onClick={this.stake} id="firstSubmit" disabled={spinner}>
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
                  {this.state.spinner ? 'Staking..' : 'Stake'}
                </Button>
              </>
            ) : (
              <>
                <Alert variant="success">
                  Your staking contract is deployed at{' '}
                  <Link to={`/stakings/${this.state.displayMessage}`}>
                    {this.state.displayMessage}
                  </Link>
                  !
                </Alert>
              </>
            )}
          </Form>
        </Card>
      </Layout>
    );
  }
}
