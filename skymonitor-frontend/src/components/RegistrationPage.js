import React, { useState } from 'react';
//import axios from 'axios';
import register from '../API/Register';

function RegistrationForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const registerUser = async (e) => {
        e.preventDefault();
        var resp = await register({name, email, password});
        setResponse(resp);
    }

    return (
        <div>
            <h2>Registrati</h2>
        <form onSubmit={registerUser}>
            <label htmlFor="name-input">Inserisci il tuo nome:</label>
            <input id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email-input">Inserisci la tua email:</label>
            <input id="email-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="pass-input">Inserisci la password:</label>
            <input id="pass-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Registrati"/>
        </form>

        <p>{response}</p>
        </div>

    );
}


export default RegistrationForm;