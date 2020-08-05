import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListOfLoadMethods } from './ListOfLoadMethods';
import { UsingMetamask } from './UsingMetamask';
import { UsingAddress } from './UsingAddress';

export class LoadWallet extends Component {
  render() {
    return (
      <Switch>
        <Route path="/load-wallet" exact component={ListOfLoadMethods} />
        <Route path="/load-wallet/using-address" exact component={UsingAddress} />
        <Route path="/load-wallet/using-metamask" exact component={UsingMetamask} />
      </Switch>
    );
  }
}
