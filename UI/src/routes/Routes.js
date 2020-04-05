import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import LogIn from '../pages/LogIn/LogIn';
import SignUp from '../pages/SignUp/SignUp';
import DriverPage from '../pages/DriverPage/DriverPage';
import UserAccount from '../pages/UserAccount/UserAccount';
import ChangePassword from '../pages/ChangePassword/ChangePassword';

const Routes = ({currentUser}) => {
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
      <Route exact path="/driver" >
        <DriverPage currentUser={currentUser}/>
      </Route>
      <Route exact path="/me" >
        <UserAccount currentUser={currentUser}/>
      </Route>
      <Route exact path="/change-password" >
        <ChangePassword currentUser={currentUser}/>
      </Route>
    </Switch>
  );
};

export default Routes;
