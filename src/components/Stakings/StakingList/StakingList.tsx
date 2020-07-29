import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Layout } from '../../Layout';
import { StakingListElement } from './StakingListElement';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import { routine } from '../../../utils';
import '../Stakings.css';
import { ethers } from 'ethers';

type StakingListState = {
  // stakingInstances: TimeAllyStaking[] | null;
  myStakings: MyStaking[] | null;
  displayMessage: string;
};

interface StakingTransferEvent {
  from: string;
  to: string;
  stakingContract: string;
}

interface MyStaking {
  address: string;
  status: 'hold' | 'transferred' | 'burned';
}

export class StakingList extends Component<RouteComponentProps, StakingListState> {
  state: StakingListState = {
    myStakings: null,
    displayMessage: 'Loading your stakings...',
  };

  intervalIds: NodeJS.Timeout[] = [];

  componentDidMount = async () => {
    this.intervalIds.push(routine(this.loadStakings, 8000));
  };

  componentWillUnmount = async () => {
    this.intervalIds.forEach(clearInterval);
  };

  loadStakings = async () => {
    if (!window.wallet) {
      // throw error in UI that wallet is not loaded
      return this.setState({
        displayMessage: 'Wallet not found. Please load your wallet to view your stakings.',
      });
    }

    const stakingTransfers = [
      ...(await window.timeallyManagerInstance.queryFilter(
        window.timeallyManagerInstance.filters.StakingTransfer(null, window.wallet.address, null)
      )),
      ...(await window.timeallyManagerInstance.queryFilter(
        window.timeallyManagerInstance.filters.StakingTransfer(window.wallet.address, null, null)
      )),
    ]
      .sort((event1, event2) => {
        return event1.blockNumber > event2.blockNumber ? 1 : -1;
      })
      .map((event) => window.timeallyManagerInstance.interface.parseLog(event))
      .map((parsedLog) => {
        const stakingTransfer: StakingTransferEvent = {
          from: parsedLog.args[0],
          to: parsedLog.args[1],
          stakingContract: parsedLog.args[2],
        };
        return stakingTransfer;
      });

    const myStakings: MyStaking[] = [];

    for (const [key, stakingTransfer] of Object.entries(stakingTransfers)) {
      const finded = myStakings.find((myStaking) => {
        return myStaking.address === stakingTransfer.stakingContract;
      });
      if (finded) continue;

      const filterred = stakingTransfers.filter((staking) => {
        return staking.stakingContract === stakingTransfer.stakingContract;
      });
      console.log(stakingTransfer.stakingContract, filterred);

      let acquiredIndex: number = -1;
      for (const [i, filterredStakingTransfer] of Object.entries(filterred)) {
        if (filterredStakingTransfer.to === window.wallet.address) {
          acquiredIndex = +i;
        }
      }
      if (acquiredIndex === filterred.length - 1) {
        myStakings.push({
          address: stakingTransfer.stakingContract,
          status: 'hold',
        });
      } else if (filterred[filterred.length - 1].to === ethers.constants.AddressZero) {
        myStakings.push({
          address: stakingTransfer.stakingContract,
          status: 'burned',
        });
      } else {
        myStakings.push({
          address: stakingTransfer.stakingContract,
          status: 'transferred',
        });
      }
    }

    this.setState({ myStakings, displayMessage: '' });
  };

  render() {
    return (
      <Layout
        title="My Stakings"
        button={{
          // name: 'ISSTIME LIMIT CALCULATOR',
          // className: 'pink-btn',
          name: 'New Staking',
          link: '/stakings/new',
        }}
      >
        {this.state.displayMessage ? (
          <Alert variant="info">{this.state.displayMessage}</Alert>
        ) : null}

        {this.state.myStakings !== null ? (
          this.state.myStakings.length === 0 ? (
            <Alert variant="info">
              You do not own any TimeAlly Staking ERC1167 Smart Contracts. You can buy staking from
              someone who already has a staking or you can use your Era Swap Tokens to deploy a new
              staking ERC1167 smart contract.
            </Alert>
          ) : (
            <div className="row table-padding">
              <table>
                <thead>
                  <tr>
                    <th>Staking Contract</th>
                    <th>Staking Amount</th>
                    <th>IssTime Limit</th>
                    <th>Start Month</th>
                    <th>End Month</th>
                    <th>Timestamp</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myStakings.map((myStaking, i) => (
                    <StakingListElement
                      key={i}
                      stakingContract={myStaking.address}
                      status={myStaking.status}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : null}
      </Layout>
    );
  }
}
