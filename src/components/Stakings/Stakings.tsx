import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { StakingList } from './StakingList';
import { StakingContract } from './StakingContract';

export class Stakings extends Component<RouteComponentProps> {
  render() {
    return (
      <>
        <Switch>
          <Route path="/stakings" exact component={StakingList} />
          <Route path="/stakings/:address" component={StakingContract} />
        </Switch>
      </>
    );
  }
}
