import React, { Component } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Layout } from '../../Layout';

type State = {
  amount: string;
  liquidBalance: ethers.BigNumber | null;
  prepaidBalance: ethers.BigNumber | null;
  spinnerLiquid: boolean;
  spinnerPrepaid: boolean;
};

export class NewStaking extends Component<{}, State> {
  state: State = {
    amount: '',
    liquidBalance: null,
    prepaidBalance: null,
    spinnerLiquid: false,
    spinnerPrepaid: false,
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

  stakeLiquid = async () => {
    this.setState({ spinnerLiquid: true });
    const tx = await window.timeallyManagerInstance.connect(window.wallet).stake({
      value: ethers.utils.parseEther(this.state.amount),
    });
    await tx.wait();
    this.setState({ spinnerLiquid: false });
  };

  stakePrepaid = async () => {
    this.setState({ spinnerPrepaid: true });
    const tx = await window.prepaidEsInstance
      .connect(window.wallet)
      .transfer(window.timeallyManagerInstance.address, ethers.utils.parseEther(this.state.amount));
    await tx.wait();
    this.setState({ spinnerPrepaid: false });
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

    const { spinnerLiquid, spinnerPrepaid } = this.state;

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

            <Button
              variant="primary"
              onClick={this.stakeLiquid}
              id="firstSubmit"
              disabled={!sufficientLiquid || spinnerLiquid || spinnerPrepaid}
            >
              {this.state.spinnerLiquid ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: '2px' }}
                />
              ) : null}
              {this.state.spinnerLiquid ? 'Please wait..' : 'Liquid'}
            </Button>
            <Button
              variant="warning"
              onClick={this.stakePrepaid}
              id="firstSubmit"
              disabled={true || !sufficientPrepaid || spinnerLiquid || spinnerPrepaid}
            >
              {this.state.spinnerPrepaid ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginRight: '2px' }}
                />
              ) : null}
              {this.state.spinnerLiquid ? 'Please wait..' : 'Prepaid'}
            </Button>
          </Form>
        </Card>
      </Layout>
    );
  }
}
