import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { NavbarMain } from './components/Navbar';
import { OneLifeOneTime } from './components/OneLifeOneTime';
import { Dashboard } from './components/Dashboard';
import { Stakings } from './components/Stakings';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/1life1time" exact component={OneLifeOneTime} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/stakings" component={Stakings} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
