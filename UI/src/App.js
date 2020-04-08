import React, {useEffect, useState} from 'react';
import './App.css';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './shared/CustomNavbar';
import authService from './service/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const userSubscription =
        authService.currentUserSubject.subscribe((user) => {
          setCurrentUser(user);
        });
    return () => userSubscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <CustomNavbar
        currentUser={currentUser}
        onSetCurrentUser={setCurrentUser}
      />
      <Routes currentUser={currentUser} handleLogin/>
    </div>
  );
}

export default App;
