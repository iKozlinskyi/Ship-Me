import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {getNavbarLinksForUser} from '../utils/getNavbarLinksForUser';

const CustomNavbar = ({currentUser}) => {
  const userLinks = getNavbarLinksForUser(currentUser);

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
    </Navbar>
  );
};

export default CustomNavbar;
