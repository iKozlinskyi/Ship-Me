import React from 'react';
import LoadsPanel from './LoadsPanel/LoadsPanel';

const LoadsPage = ({currentUser}) => {
  return (
    <div>
      <h3>Hello, {currentUser.username}</h3>
      <LoadsPanel currentUser={currentUser}/>
    </div>
  );
};

export default LoadsPage;
