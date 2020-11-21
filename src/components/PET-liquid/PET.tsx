import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info';
import New from './New';
import View from './View/View';
import PETId from './View/PETId/PETId';
import Deposit from './View/Deposit/Deposit';
import LumSumDeposit from './View/Deposit/LumSumDeposit';
import Nominee from './View/Nominee/Nominee';
import NewNominee from './View/Nominee/NewNominee';
import PrepaidES from './PrepaidES/PrepaidES';
import AddToPrepaid from './PrepaidES/AddToPrepaid';
import SendPrepaidESDifferent from './PrepaidES/SendPrepaidESDifferent';
import Benefits from './View/Benefits/Benefits';

// import './PET.css';

export class PETLiquid extends Component {
  render() {
    return (
      <>
        <Route path="/pet-new" exact component={Info} />

        <Route path="/pet-new/new" exact component={New} />

        <Route path="/pet-new/view" exact component={View} />

        <Route path="/pet-new/view/:id" exact component={PETId} />

        <Route path="/pet-new/view/:id/benefits/" exact component={Benefits} />

        <Route path="/pet-new/view/:id/deposit/" exact component={Deposit} />
        <Route path="/pet-new/view/:id/lum-sum-deposit/" exact component={LumSumDeposit} />

        <Route path="/pet-new/view/:id/nominees" exact component={Nominee} />
        <Route path="/pet-new/view/:id/nominees/new" exact component={NewNominee} />

        <Route path="/pet-new/prepaid-es/" exact component={PrepaidES} />
        <Route path="/pet-new/prepaid-es/add-to-prepaid" exact component={AddToPrepaid} />
        <Route path="/pet-new/prepaid-es/send" exact component={SendPrepaidESDifferent} />
      </>
    );
  }
}
