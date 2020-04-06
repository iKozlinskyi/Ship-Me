import React from 'react';
import TrucksPanel from './TrucksPanel/TrucksPanel';

const DriverPage = ({currentUser}) => {
  return (
    <div>
      <h3>Hello, {currentUser.username}</h3>
      <TrucksPanel currentUser={currentUser}/>
    </div>
  );
};

export default DriverPage;
