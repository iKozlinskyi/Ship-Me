import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink, withRouter} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {getNavbarLinksForUser} from '../utils/getNavbarLinksForUser';
import authService from '../service/AuthService';

const CustomNavbar = ({currentUser, history, onSetCurrentUser}) => {
  const userLinks = getNavbarLinksForUser(currentUser);
  const handleLogout = () => {
    authService.logOut();
    onSetCurrentUser(null);
    history.push('/');
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-2">
      <LinkContainer to="/"><Navbar.Brand>ShipMe</Navbar.Brand></LinkContainer>
      <Nav className="mr-auto">
        {userLinks.map(({to, name}, idx) => {
          return (
            <NavLink to={to} className="nav-link" key={idx}>{name}</NavLink>
          );
        })}

      </Nav>
      <Nav>
        {currentUser ? <>
          <NavLink to="/me" className="nav-link">
            Logged in as {currentUser.username}
          </NavLink>
          <Nav.Link className="nav-link" onClick={handleLogout}>
            Log Out
          </Nav.Link>
        </> : <>
          <NavLink to="/login" className="nav-link">
            Log In
          </NavLink>
          <NavLink to="/register" className="nav-link">
            Sign Up
          </NavLink>
        </>}
      </Nav>
    </Navbar>
  );
};

export default withRouter(CustomNavbar);
