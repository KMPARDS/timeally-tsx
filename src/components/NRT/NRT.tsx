import React, { Component } from 'react';
import { Layout } from '../Layout';
import { BigNumber } from 'ethers';
import { formatEther, isAddress, parseEther } from 'ethers/lib/utils';
import { isValidAmountInput, routine } from '../../utils';
import { Alert, Button, Card, Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';
import type { Variant } from 'react-bootstrap/types';
import { EraswapInfo, parseEthersJsError } from 'eraswap-sdk/dist/utils';
import { AddressDisplayer } from '../../AddressDisplayer';
import { BlockNumberToTimeElapsed } from '../../BlockNumberToTimeElapsed';

type State = {
  display: { message: string; variant: Variant } | null;
  amountInput: string;
  poolSelect: null | 'Burn Pool' | 'Luck Pool';
  spinner: boolean;

  burnPoolAdditions: PoolEvent[] | null;
  luckPoolAdditions: PoolEvent[] | null;
};

interface PoolEvent {
  nrtMonth: number;
  value: BigNumber;
  sender: string;
  blockNumber: number;
  txHash: string;
}

export class NRT extends Component<{}, State> {
  state: State = {
    display: null,
    amountInput: '',
    poolSelect: null,
    spinner: false,

    burnPoolAdditions: null,
    luckPoolAdditions: null,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = () => {
    this.intervalIds.push(routine(this.updateBurnPoolAdditions, 8000));
    this.intervalIds.push(routine(this.updateLuckPoolAdditions, 8000));
  };

  componentWillUnmount = () => {
    this.intervalIds.forEach(clearInterval);
  };

  addToPool = async () => {
    this.setState({ spinner: true });
    try {
      if (!window.wallet) {
        throw new Error('Wallet not loaded');
      }

      if (this.state.poolSelect === null) {
        throw new Error('Pool not selected');
      }

      const tx = await window.nrtManagerInstance
        .connect(window.wallet)
        [this.state.poolSelect === 'Burn Pool' ? 'addToBurnPool()' : 'addToLuckPool()']({
          value: parseEther(this.state.amountInput),
        });
      await tx.wait();

      this.setState({
        display: {
          message: `Tx sent! Hash: ${tx.hash}`,
          variant: 'success',
        },
        spinner: false,
      });
    } catch (error) {
      this.setState({
        display: { message: parseEthersJsError(error), variant: 'danger' },
        spinner: false,
      });
    }
  };

  updateBurnPoolAdditions = async () => {
    const blockNumber = await window.provider.getBlockNumber();
    const filter = window.nrtManagerInstance.filters.BurnPoolAccrue(null, null, null);
    const logs = ((await window.nrtManagerInstance.queryFilter(
      filter,
      blockNumber - 3000,
      blockNumber
    )) as unknown) as {
      args: PoolEvent;
      transactionHash: string;
      blockNumber: number;
    }[];

    this.setState({
      burnPoolAdditions: logs
        .slice()
        .reverse()
        .map((l) => ({
          nrtMonth: l.args.nrtMonth,
          value: l.args.value,
          sender: l.args.sender,
          txHash: l.transactionHash,
          blockNumber: l.blockNumber,
        })),
    });
  };

  updateLuckPoolAdditions = async () => {
    const blockNumber = await window.provider.getBlockNumber();
    const filter = window.nrtManagerInstance.filters.LuckPoolAccrue(null, null, null);
    const logs = ((await window.nrtManagerInstance.queryFilter(
      filter,
      blockNumber - 3000,
      blockNumber
    )) as unknown) as {
      args: PoolEvent;
      transactionHash: string;
      blockNumber: number;
    }[];

    this.setState({
      luckPoolAdditions: logs
        .slice()
        .reverse()
        .map((l) => ({
          nrtMonth: l.args.nrtMonth,
          value: l.args.value,
          sender: l.args.sender,
          txHash: l.transactionHash,
          blockNumber: l.blockNumber,
        })),
    });
  };

  render() {
    return (
      <Layout title="NRT Manager">
        <p>This screen is used to add tokens to Burn pool or Luck Pool of NRT contract.</p>
        <Card>
          <Card.Body>
            <p>
              Select whether you want to send your tokens to Burn pool for burning or Luck pool for
              distribution to community.
            </p>
            <DropdownButton
              id="dropdown-basic-button"
              variant="secondary"
              title={this.state.poolSelect ?? 'Select Pool'}
            >
              {['Burn Pool', 'Luck Pool'].map((pool) => (
                <Dropdown.Item
                  className="break"
                  onClick={() =>
                    this.setState({ poolSelect: (pool as unknown) as 'Burn Pool' | 'Luck Pool' })
                  }
                >
                  {pool}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Form.Control
              className="align-items-center"
              onChange={(event) => this.setState({ amountInput: event.target.value })}
              value={this.state.amountInput}
              type="text"
              placeholder="Enter amount to send to pool"
              autoComplete="off"
              isInvalid={!!this.state.amountInput && !isValidAmountInput(this.state.amountInput)}
            />
            <Button disabled={this.state.spinner} onClick={this.addToPool}>
              {this.state.spinner ? 'Sending...' : 'Send'}
            </Button>
          </Card.Body>
        </Card>

        {this.state.display !== null ? (
          <Alert variant={this.state.display.variant}>{this.state.display.message}</Alert>
        ) : null}

        <h3>Burn Pool Additions</h3>

        {this.state.burnPoolAdditions !== null ? (
          this.state.burnPoolAdditions.length ? (
            <Table responsive>
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>NRT Month</th>
                  <th>Value</th>
                  <th>Sender</th>
                  <th>Timestamp</th>
                  <th>Tx</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {this.state.burnPoolAdditions.map((burnPoolAddition, index) => (
                  <tr key={(this.state.burnPoolAdditions ?? []).length - index}>
                    <td>{burnPoolAddition.nrtMonth}</td>
                    <td>{formatEther(burnPoolAddition.value)} ES</td>
                    <td>
                      <AddressDisplayer address={burnPoolAddition.sender} />
                    </td>
                    <td>
                      <BlockNumberToTimeElapsed blockNumber={burnPoolAddition.blockNumber} />
                    </td>
                    <td>
                      <a target="_blank" href={EraswapInfo.getTxHref(burnPoolAddition.txHash)}>
                        View Tx on Eraswap.info
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            'No recent burn pool additions.'
          )
        ) : (
          'Please wait loading burn pool additions...'
        )}

        <h3>Luck Pool Additions</h3>

        {this.state.luckPoolAdditions !== null ? (
          this.state.luckPoolAdditions.length ? (
            <Table responsive>
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>NRT Month</th>
                  <th>Value</th>
                  <th>Sender</th>
                  <th>Timestamp</th>
                  <th>Tx</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'center' }}>
                {this.state.luckPoolAdditions.map((luckPoolAddition, index) => (
                  <tr key={(this.state.luckPoolAdditions ?? []).length - index}>
                    <td>{luckPoolAddition.nrtMonth}</td>
                    <td>{formatEther(luckPoolAddition.value)} ES</td>
                    <td>
                      <AddressDisplayer address={luckPoolAddition.sender} />
                    </td>
                    <td>
                      <BlockNumberToTimeElapsed blockNumber={luckPoolAddition.blockNumber} />
                    </td>
                    <td>
                      <a target="_blank" href={EraswapInfo.getTxHref(luckPoolAddition.txHash)}>
                        View Tx on Eraswap.info
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            'No recent luck pool additions.'
          )
        ) : (
          'Please wait loading luck pool additions...'
        )}
      </Layout>
    );
  }
}
