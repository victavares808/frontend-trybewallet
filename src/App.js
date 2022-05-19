import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Wallet } path="/carteira" exact />
      </Switch>
    </div>
  );
}

export default App;
