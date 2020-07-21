import React, { Component } from 'react';
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import { Layout } from '../../Layout';
import { Withdraw } from './Withdraw';
import { Topup } from './Topup';
import { TimeAllyStakingFactory } from '../../../ethereum/typechain/TimeAllyStakingFactory';
import '../Stakings.css';

interface MatchParams {
  address: string;
}

export class StakingContract extends Component<RouteComponentProps<MatchParams>> {
  instance = TimeAllyStakingFactory.connect(
    this.props.match.params.address,
    window.wallet ?? window.provider
  );
  render() {
    const {
      url,
      params: { address },
    } = this.props.match;

    return (
      <Layout
        title="Staking Contract"
        subtitle={address}
        breadcrumb={['Home', 'Stakings', address]}
      >
        <div className="stack-bgd-color">
          <div className="row stack-box-flex">
            <Link to={`${url}/withdraw`} className="stack-link">
              WITHDRAW
            </Link>

            <Link to={`${url}/topup`} className="stack-link">
              TOP UP
            </Link>

            <Link to={`${url}/isstime`} className="stack-link">
              ISSTIME
            </Link>

            <Link to={`${url}/split`} className="stack-link">
              SPILT TRANSFER MERGE
            </Link>

            <Link to={`${url}/delegate`} className="stack-link">
              DELEGATE
            </Link>
          </div>
        </div>

        <Switch>
          <Route path={`${url}/withdraw`} exact component={Withdraw} />
          <Route path={`${url}/topup`} exact component={Topup} />
        </Switch>
      </Layout>
    );
  }
}
