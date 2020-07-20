import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { NavbarMain } from './components/Navbar';
import { OneLifeOneTime } from './components/OneLifeOneTime';
import './style.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarMain />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/1life1time" exact component={OneLifeOneTime} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
