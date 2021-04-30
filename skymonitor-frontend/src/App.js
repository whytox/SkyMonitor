import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom';
import './App.css';
import UserContext from './API/currentUser';

import LoginPage from './components/LoginPage';
import FlightPage from './components/FlightsPage';
import Nav from './components/Nav';
import LogoutPage from './components/LogoutPage';
import RegistrationPage from './components/RegistrationPage';
import MonitorPage from './components/MonitorPage';
import FlightDetailPage from './components/FlightDetailPage';
import HomePage from './components/HomePage';


function App() {

  const memorizedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(memorizedUser);

  return (
    <UserContext.Provider value={{user, setUser}}>
    
    <div className="App">
      
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage}/>
          <Route path="/flights" component={FlightPage} />
          <Route path="/logout" component={LogoutPage}/>
          <Route path="/register" component={RegistrationPage}/>
          <Route path="/monitor" component={MonitorPage}/>
          <Route path="/flightDetail/:id" component={FlightDetailPage} />
        </Switch>
      </Router>
    </div>

    </UserContext.Provider>
  );
}

export default App;
