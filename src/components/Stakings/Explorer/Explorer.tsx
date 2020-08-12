import React, { Component } from 'react';
import { Layout } from '../../Layout';
import { Form, Card, Button, Table, Col } from 'react-bootstrap';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { routine } from '../../../utils';
import { StakingTransferRow, StakingTransferEvent } from './StakingTransferRow';

type State = {
  stakingAddressInput: string;
  recentStakingTransfers: StakingTransferEvent[];
  numberOfTransfers: number;
};

export class Explorer extends Component<{}, State> {
  state: State = {
    stakingAddressInput: '',
    recentStakingTransfers: [],
    numberOfTransfers: 10,
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.loadStakingTransfers, 16000));
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

      if (diff === currentBlockNumber) break;

      diff *= 2;

      if (currentBlockNumber < diff) {
        diff = currentBlockNumber;
      }
    }

    const recentStakingTransfers = logs
      .reverse()
      .map((event) => ({
        event,
        parsedLog: window.timeallyManagerInstance.interface.parseLog(event),
      }))
      .map((_) => {
        const { event, parsedLog } = _;
        const stakingTransfer: StakingTransferEvent = {
          from: parsedLog.args[0],
          to: parsedLog.args[1],
          stakingContract: parsedLog.args[2],
          blockNumber: event.blockNumber,
          txHash: event.transactionHash,
        };
        return stakingTransfer;
      });

    this.setState({ recentStakingTransfers });
  };

  render() {
    return (
      <Layout title="Explore Stakings">
        <Card className="p-4 text-left">
          <p className="text-bold">Enter any staking contract address to view it:</p>

          <Form>
            <Form.Row className="align-items-center">
              <Col xs="auto" className="my-1">
                <Form.Control
                  className="align-items-center"
                  onChange={(event) => this.setState({ stakingAddressInput: event.target.value })}
                  value={this.state.stakingAddressInput}
                  type="text"
                  placeholder="Enter address of staking"
                  autoComplete="off"
                  isInvalid={
                    !!this.state.stakingAddressInput &&
                    !ethers.utils.isAddress(this.state.stakingAddressInput)
                  }
                />
              </Col>

              <Col xs="auto" className="my-1">
                <Link to={`/stakings/${this.state.stakingAddressInput}`}>
                  <Button>View staking</Button>
                </Link>
              </Col>
            </Form.Row>
          </Form>

          {/* 
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
          </Link> */}
        </Card>

        <Card className="p-4">
          <p>Recent staking transfers</p>
          <Table responsive>
            <thead>
              <tr>
                <th>Staking Contract</th>
                <th>From</th>
                <th>To</th>
                <th>Principal Amount</th>
                <th>End Month</th>
                <th>Timestamp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.recentStakingTransfers
                .slice(0, this.state.numberOfTransfers)
                .map((transfer, i) => (
                  <StakingTransferRow key={i} stakingTransferEvent={transfer} />
                ))}
            </tbody>
            {this.state.recentStakingTransfers.length ? (
              <Button
                className="btn btn-primary mt10 mb20 ml10"
                onClick={() =>
                  this.setState({ numberOfTransfers: this.state.numberOfTransfers + 10 })
                }
              >
                Show More Transfers
              </Button>
            ) : null}
          </Table>
        </Card>
      </Layout>
    );
  }
}
