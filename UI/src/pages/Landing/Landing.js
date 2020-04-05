import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <header className="App-header">
        <h2>Welcome to Ship-Me App</h2>
      </header>
      <Link to="/login">Login</Link><br/>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Landing;
