import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Info from './Info';
import Calculate from './Calculate';
import New from './New';
import View from './View/View';
import AssuranceId from './View/AssuranceId/AssuranceId';
import Deposit from './View/Deposit/Deposit';
import Benefits from './View/Benefits/Benefits';
// import PowerBooster from './View/PowerBooster/PowerBooster';
import Nominee from './View/Nominee/Nominee';
import NewNominee from './View/Nominee/NewNominee';
import Appointee from './View/Appointee/Appointee';
import NewAppointee from './View/Appointee/NewAppointee';

import './Assurance.css';

class Assurance extends Component {
  render() {
    return (
      <>
        <Route path ="/assurance" exact component={Info} />

        <Route path ="/assurance/calculate" exact component={Calculate} />

        <Route path ="/assurance/new" exact component={New} />

        <Route path ="/assurance/view" exact component={View} />

        <Route path ="/assurance/view/:id" exact component={AssuranceId} />

        <Route path ="/assurance/view/:id/deposit/:month" exact component={Deposit} />

        <Route path ="/assurance/view/:id/benefits" exact component={Benefits} />

        <Route path ="/assurance/view/:id/nominees" exact component={Nominee} />
        <Route path ="/assurance/view/:id/nominees/new" exact component={NewNominee} />

        <Route path ="/assurance/view/:id/appointees" exact component={Appointee} />
        <Route path ="/assurance/view/:id/appointees/new" exact component={NewAppointee} />
      </>
    );
  }
};

export default Assurance;
