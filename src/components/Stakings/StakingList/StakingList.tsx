import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Layout } from '../../Layout';
import { StakingListElement } from './StakingListElement';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import { routine } from '../../../utils';
import '../Stakings.css';

type StakingListState = {
  stakings: TimeAllyStaking[] | null;
  displayMessage: string;
};

export class StakingList extends Component<RouteComponentProps, StakingListState> {
  state: StakingListState = {
    stakings: null,
    displayMessage: '',
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

    const stakings = (
      await window.timeallyManagerInstance.queryFilter(
        window.timeallyManagerInstance.filters.StakingTransfer(null, window.wallet.address, null)
      )
    )
      .map((event) => window.timeallyManagerInstance.interface.parseLog(event))
      .map((parsedLog) => {
        const stakingAddress: string = parsedLog.args[2];
        return TimeAllyStakingFactory.connect(stakingAddress, window.wallet);
      });
    // console.log(stakings);

    this.setState({ stakings });
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
        {this.state.stakings === null ? (
          <Alert variant="info">Loading your stakings...</Alert>
        ) : this.state.stakings.length === 0 ? (
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
                  <th>Start Month</th>
                  <th>End Month</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.stakings.map((instance, i) => (
                  <StakingListElement
                    key={i}
                    instance={instance}
                    linkPrepend={this.props.match.url}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Layout>
    );
  }
}
