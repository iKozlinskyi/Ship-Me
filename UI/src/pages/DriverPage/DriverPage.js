import React, {useEffect, useState} from 'react';
import {getCurrentUser} from '../../api/userApi';
import TrucksPanel from './TrucksPanel/TrucksPanel';

const DriverPage = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);

  return (
    <div>
      <h3>Hello, {currentUser.username}</h3>
      <h4>Here are your trucks: </h4>
      <TrucksPanel currentUser={currentUser}/>
    </div>
  );
};

export default DriverPage;
