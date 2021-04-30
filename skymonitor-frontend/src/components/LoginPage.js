import React, { useState, useContext} from 'react';
import { useHistory } from "react-router-dom";
//import {isLogged} from '../API/currentUser';
import login from '../API/Login';
import UserContext from '../API/currentUser';


function LoginPage() {
  const {user, setUser} = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("Inserisci le credenziali e fai il log-in.");

  // PER REINDIRIZZAMENTO DOPO LOGIN
  const history = useHistory();

  //DEFINISCE OPERAZIONE DI LOGIN
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent reload

    // RICHIESTA DI LOGIN AD API
    var response = await login({email, password});

    // ANALIZZO RISPOSTA
    if (response.ok) {
      var loggedUser = await response.json();
      console.log(JSON.stringify(loggedUser));
      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      //setMsg("Bentornato, " + loggedUser.name + ". Reindirizzamento alla home tra 3 secondi.");
      history.push('/flights');
    } else {
      var errorMsg = await response.text();
      setMsg(errorMsg);
    }

  }


  return (
    <div className="login-page">
      <h2>
        Log-In
      </h2>
      <form onSubmit={handleLogin}>
            <label htmlFor="email-input">Inserisci la tua email:</label>
            <input id="email-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="pass-input">Inserisci la password:</label>
            <input id="pass-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Login"/>
        </form>
        <p>{msg}</p>
    </div>
  )
}

export default LoginPage;

  /*
  if (user)
    history.push('/flights');

  const loginUser = async (e) => {
    e.preventDefault();
    const valid_login = await login({ email, password });
    if (valid_login)
      history.push('/flights');
    else
      setMsg('Le credenziali non sono valide');

  } */
