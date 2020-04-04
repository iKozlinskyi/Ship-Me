import React from 'react';
import './App.css';
import Routes from './routes/Routes';
import LogIn from './pages/LogIn/LogIn';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <LogIn />
      <Routes/>
    </div>
  );
}

export default App;
