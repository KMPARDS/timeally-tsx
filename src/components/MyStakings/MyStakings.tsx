import React, { Component } from 'react';
import { Layout } from '../Layout';
import { TimeAllyStaking } from '../../ethereum/typechain/TimeAllyStaking';
import { TimeAllyStakingFactory } from '../../ethereum/typechain/TimeAllyStakingFactory';
import './MyStakings.css';

type MyStakingState = {
  stakings: TimeAllyStaking[];
  displayMessage: string;
};

export class MyStakings extends Component<{}, MyStakingState> {
  state: MyStakingState = {
    stakings: [],
    displayMessage: '',
  };

  componentDidMount = async () => {
    this.loadStakings();
  };

  loadStakings = async () => {
    if (!window.wallet) {
      // throw error in UI that wallet is not loaded
      return this.setState({
        displayMessage:
          'Wallet not found. Please load your wallet to view your stakings.',
      });
    }

    const stakings = (
      await window.timeallyManager.queryFilter(
        window.timeallyManager.filters.StakingTransfer(
          null,
          window.wallet.address,
          null
        )
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
    return (
      <Layout
        title="My Stakings"
        breadcrumb={['My Stakings']}
        button={{
          name: 'ISSTIME LIMIT CALCULATOR',
          className: 'pink-btn',
        }}
      >
        <div className="row table-padding">
          <table>
            <tr>
              <th>Staking ID</th>
              <th>Staking Amount</th>
              <th>Plan</th>
              <th>Time</th>
              <th>Estimated next benefit time</th>
              <th>Country</th>
              <th>Country</th>
            </tr>
            <tr>
              <td>5</td>
              <td>7804.976628809254477568 ES</td>
              <td>1 Year</td>
              <td>6/16/2020 4:59:13 PM</td>
              <td>29 days, 18 hours,43 minutes 24 seconds</td>
              <td>67.89 ES Go to view staking to withdraw this benefit</td>
              <td>
                <a
                  href="/stacking-id"
                  className="btn btn-default main-btn-blue view"
                >
                  VIEW
                </a>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>7804.976628809254477568 ES</td>
              <td>1 Year</td>
              <td>6/16/2020 4:59:13 PM</td>
              <td>29 days, 18 hours,43 minutes 24 seconds</td>
              <td>67.89 ES Go to view staking to withdraw this benefit</td>
              <td>
                <a
                  href="/stacking-id"
                  className="btn btn-default main-btn-blue view"
                >
                  VIEW
                </a>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>7804.976628809254477568 ES</td>
              <td>1 Year</td>
              <td>6/16/2020 4:59:13 PM</td>
              <td>29 days, 18 hours,43 minutes 24 seconds</td>
              <td>67.89 ES Go to view staking to withdraw this benefit</td>
              <td>
                <a
                  href="/stacking-id"
                  className="btn btn-default main-btn-blue view"
                >
                  VIEW
                </a>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>7804.976628809254477568 ES</td>
              <td>1 Year</td>
              <td>6/16/2020 4:59:13 PM</td>
              <td>29 days, 18 hours,43 minutes 24 seconds</td>
              <td>67.89 ES Go to view staking to withdraw this benefit</td>
              <td>
                <a
                  href="/stacking-id"
                  className="btn btn-default main-btn-blue view"
                >
                  VIEW
                </a>
              </td>
            </tr>

            <tr>
              <td>5</td>
              <td>7804.976628809254477568 ES</td>
              <td>1 Year</td>
              <td>6/16/2020 4:59:13 PM</td>
              <td>29 days, 18 hours,43 minutes 24 seconds</td>
              <td>67.89 ES Go to view staking to withdraw this benefit</td>
              <td>
                <a
                  href="/stacking-id"
                  className="btn btn-default main-btn-blue view"
                >
                  VIEW
                </a>
              </td>
            </tr>
          </table>
        </div>
      </Layout>
    );
  }
}
