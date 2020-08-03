import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { StakingList } from './StakingList';
import { NewStaking } from './NewStaking';
import { Explorer } from './Explorer';
import { StakingContract } from './StakingContract';

export class Stakings extends Component<RouteComponentProps> {
  render() {
    return (
      <>
        <Switch>
          <Route path="/stakings" exact component={StakingList} />
          <Route path="/stakings/new" exact component={NewStaking} />
          <Route path="/stakings/explorer" exact component={Explorer} />
          <Route path="/stakings/:address" component={StakingContract} />
        </Switch>
      </>
    );
  }
}
