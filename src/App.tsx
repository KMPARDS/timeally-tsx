import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { NavbarMain } from './components/Navbar';
import { Footer } from './components/Footer';
import { OneLifeTime } from './components/OneLifeTime';
import { Dashboard } from './components/Dashboard';
import { Stakings } from './components/Stakings';
import { Support } from './components/Support';
import { TermsAndConditions } from './components/TermsAndConditions';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/1lifetime" exact component={OneLifeTime} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/stakings" component={Stakings} />
          <Route path="/support" component={Support} />
          <Route path="/terms" component={TermsAndConditions} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
