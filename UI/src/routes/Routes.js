import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import LogIn from '../pages/LogIn/LogIn';
import SignUp from '../pages/SignUp/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/login" >
        <LogIn />
      </Route>
      <Route exact path="/register" >
        <SignUp />
      </Route>
    </Switch>
  );
};

export default Routes;
