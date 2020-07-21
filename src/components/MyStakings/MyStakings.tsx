import React, { Component } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import { Layout } from '../Layout';
import './MyStakings.css';

export class MyStakings extends Component {
  state = {};

  componentDidMount = async () => {};

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
