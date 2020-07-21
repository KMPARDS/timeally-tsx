import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Layout } from '../../Layout';
import { StakingListElement } from './StakingListElement';
import { TimeAllyStaking } from '../../../ethereum/typechain/TimeAllyStaking';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
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

  componentDidMount = async () => {
    this.loadStakings();
  };

  loadStakings = async () => {
    if (!window.wallet) {
      // throw error in UI that wallet is not loaded
      return this.setState({
        displayMessage: 'Wallet not found. Please load your wallet to view your stakings.',
      });
    }

    const stakings = (
      await window.timeallyManager.queryFilter(
        window.timeallyManager.filters.StakingTransfer(null, window.wallet.address, null)
      )
    )
      .map((event) => window.timeallyManager.interface.parseLog(event))
      .map((parsedLog) => {
        const stakingAddress: string = parsedLog.args[2];
        return TimeAllyStakingFactory.connect(stakingAddress, window.wallet);
      });
    console.log(stakings);

    this.setState({ stakings });
  };

  render() {
    console.log(this.props);
    return (
      <Layout
        title="My Stakings"
        breadcrumb={['My Stakings']}
        button={{
          name: 'ISSTIME LIMIT CALCULATOR',
          className: 'pink-btn',
        }}
      >
        {this.state.stakings === null ? (
          <Alert variant="info">Loading your stakings...</Alert>
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
