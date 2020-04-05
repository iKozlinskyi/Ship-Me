import React, {useEffect, useState} from 'react';
import './App.css';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCurrentUser} from './api/userApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user));
  }, []);

  return (
    <div className="App">
      <Routes currentUser={currentUser}/>
    </div>
  );
}

export default App;
