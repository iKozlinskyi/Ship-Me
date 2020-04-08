import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import LogIn from '../pages/LogIn/LogIn';
import SignUp from '../pages/SignUp/SignUp';
import TrucksPage from '../pages/TrucksPage/TrucksPage';
import UserAccount from '../pages/UserAccount/UserAccount';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import LoadsPage from '../pages/LoadsPage/LoadsPage';

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
      <Route exact path="/trucks" >
        <TrucksPage currentUser={currentUser}/>
      </Route>
      <Route exact path="/loads" >
        <LoadsPage currentUser={currentUser}/>
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
