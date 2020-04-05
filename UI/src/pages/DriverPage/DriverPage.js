import React from 'react';
import TrucksPanel from './TrucksPanel/TrucksPanel';

const DriverPage = ({currentUser}) => {
  return (
    <div>
      <h3>Hello, {currentUser.username}</h3>
      <h4>Here are your trucks: </h4>
      <TrucksPanel currentUser={currentUser}/>
    </div>
  );
};

export default DriverPage;
