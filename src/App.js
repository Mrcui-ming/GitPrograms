import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Login from './views/login/Login';
import Register from './views/register/Register';
import Main from './views/main/Main';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={ Login }></Route>
        <Route path="/register" component={ Register }></Route>
        <Route component={ Main }></Route>
      </Switch>
    </div>
  );
}

export default App;
