import React, { Component } from 'react';
import { Layout } from '../../Layout';
import { Form, Card, Button, Table } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { routine } from '../../../utils';

interface StakingTransferEvent {
  from: string;
  to: string;
  stakingContract: string;
}

type State = {
  stakingAddressInput: string;
  recentStakingTransfers: StakingTransferEvent[];
};

export class Explorer extends Component<{}, State> {
  state: State = {
    stakingAddressInput: '',
    recentStakingTransfers: [],
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.loadStakingTransfers, 8000));
  };

  componentWillUnmount = async () => {
    this.intervalIds.forEach(clearInterval);
  };

  loadStakingTransfers = async () => {
    // load upto last 10 staking transfers
    let logs: ethers.Event[] = [];
    const currentBlockNumber = await window.provider.getBlockNumber();
    let diff = 1000;

    while (logs.length < 10) {
      logs = await window.timeallyManagerInstance.queryFilter(
        window.timeallyManagerInstance.filters.StakingTransfer(null, null, null),
        currentBlockNumber - diff,
        'latest'
      );
      diff *= 2;
    }

    const recentStakingTransfers = logs
      .reverse()
      .map((event) => window.timeallyManagerInstance.interface.parseLog(event))
      .map((parsedLog) => {
        const stakingTransfer: StakingTransferEvent = {
          from: parsedLog.args[0],
          to: parsedLog.args[1],
          stakingContract: parsedLog.args[2],
        };
        return stakingTransfer;
      });

    this.setState({ recentStakingTransfers });
  };

  render() {
    return (
      <Layout title="Explore Stakings">
        <Card className="p-4">
          <p>Enter any staking contract address to view it:</p>
          <Form.Control
            onChange={(event) => this.setState({ stakingAddressInput: event.target.value })}
            value={this.state.stakingAddressInput}
            type="text"
            placeholder="Enter address of staking"
            style={{ width: '325px' }}
            autoComplete="off"
            isInvalid={
              !!this.state.stakingAddressInput &&
              !ethers.utils.isAddress(this.state.stakingAddressInput)
            }
          />
          <Link to={`/stakings/${this.state.stakingAddressInput}`}>
            <Button>View staking</Button>
          </Link>
        </Card>

        <Card className="p-4">
          <p>Recent staking transfers</p>
          <Table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Contract</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recentStakingTransfers.map((transfer, i) => (
                <tr key={i}>
                  <td className="hex-string">{transfer.from}</td>
                  <td className="hex-string">{transfer.to}</td>
                  <td className="hex-string">
                    <Link to={`/stakings/${transfer.stakingContract}`}>
                      {transfer.stakingContract}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Layout>
    );
  }
}
