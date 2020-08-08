import React, { Component } from 'react';
import { Card, Form, Button, Spinner, Alert, Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { TimeAllyStaking } from '../../../../../ethereum/typechain/TimeAllyStaking';

type Props = {
  instance: TimeAllyStaking;
  refreshDetailsHook(): Promise<void>;
  destroyStatus: { reason: 0 | 1 | 2; txHash: string; mergedIn: string | null } | null;
};

type State = {
  amount: string;
  liquidBalance: ethers.BigNumber | null;
  prepaidBalance: ethers.BigNumber | null;
  spinnerLiquid: boolean;
  spinnerPrepaid: boolean;
  displayMessage: string;
  topups:
    | {
        amount: ethers.BigNumber;
        benefactor: string;
        timestamp: number;
      }[]
    | null;
};

export class Topup extends Component<Props, State> {
  state: State = {
    amount: '',
    liquidBalance: null,
    prepaidBalance: null,
    spinnerLiquid: false,
    spinnerPrepaid: false,
    displayMessage: '',
    topups: null,
  };

  instance = this.props.instance;

  componentDidMount = async () => {
    this.updateBalances();
    this.loadTopups();
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

  loadTopups = async () => {
    const filter = this.instance.filters.Topup(null, null);
    const logs = await this.instance.queryFilter(filter);
    const timestamps = await Promise.all(
      logs.map(async (log) => {
        const block = await window.provider.getBlock(log.blockNumber);
        return block.timestamp;
      })
    );
    let topups = logs
      .map((log) => this.instance.interface.parseLog(log))
      .map((parsedLog, i) => {
        return {
          amount: parsedLog.args[0],
          benefactor: parsedLog.args[1],
          timestamp: timestamps[i],
        };
      });

    this.setState({ topups });
  };

  topupLiquid = async () => {
    this.setState({ spinnerLiquid: true, displayMessage: '' });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.wallet.sendTransaction({
        to: this.instance.address,
        value: ethers.utils.parseEther(this.state.amount),
      });
      await tx.wait();
      this.setState({ spinnerLiquid: false, displayMessage: 'Success' });
    } catch (error) {
      this.setState({ spinnerLiquid: false, displayMessage: error.message });
    }
    this.loadTopups();
    this.props.refreshDetailsHook();
  };

  topupPrepaid = async () => {
    this.setState({ spinnerPrepaid: true, displayMessage: '' });
    try {
      if (!window.wallet) {
        throw new Error('Wallet is not loaded');
      }
      const tx = await window.prepaidEsInstance
        .connect(window.wallet)
        .transfer(this.instance.address, ethers.utils.parseEther(this.state.amount));
      await tx.wait();
      this.setState({ spinnerLiquid: false, displayMessage: 'Success' });
    } catch (error) {
      this.setState({ spinnerLiquid: false, displayMessage: error.message });
    }
    this.loadTopups();
    this.props.refreshDetailsHook();
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
      <>
        <h3>Topup</h3>

        {this.state.topups === null ? (
          'Loading topups..'
        ) : this.state.topups.length === 0 ? (
          'No previous topups'
        ) : (
          <>
            Previous Topups:
            <Table responsive>
              <thead>
                <tr>
                  <th>Topup Amount</th>
                  <th>Benefactor</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {this.state.topups.map((topup, index) => (
                  <tr key={index}>
                    <td>{ethers.utils.formatEther(topup.amount)} ES</td>
                    <td>{topup.benefactor}</td>
                    <td>{new Date(topup.timestamp * 1000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

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
            <h3 style={{ marginBottom: '15px' }}>Top up staking</h3>

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
                      . Your Prepaid balance is{' '}
                      {this.state.prepaidBalance
                        ? ethers.utils.formatEther(this.state.prepaidBalance) + ' ES'
                        : 'Loading...'}
                    </>
                  )}
                </Alert>
              ) : null}
            </Form.Group>

            {this.props.destroyStatus !== null ? (
              <Alert variant="danger">
                The staking contract is destroyed, so any topup done will be permanently locked at
                the staking contract address.
              </Alert>
            ) : null}

            <Button
              variant="primary"
              onClick={this.topupLiquid}
              id="firstSubmit"
              disabled={
                !sufficientLiquid ||
                spinnerLiquid ||
                spinnerPrepaid ||
                this.props.destroyStatus !== null
              }
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
              onClick={this.topupPrepaid}
              id="firstSubmit"
              disabled={
                !sufficientPrepaid ||
                spinnerLiquid ||
                spinnerPrepaid ||
                this.props.destroyStatus !== null
              }
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
              {this.state.spinnerPrepaid ? 'Please wait..' : 'Prepaid'}
            </Button>
          </Form>
        </Card>
      </>
    );
  }
}
