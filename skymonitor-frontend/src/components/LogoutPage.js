//import {isLogged} from '../API/currentUser';
import { useHistory } from "react-router-dom";
import React, {useContext, useEffect} from 'react';
import UserContext from '../API/currentUser';

function LogoutPage() {
    const {user, setUser} = useContext(UserContext);


    const history = useHistory();
    const confirmLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        history.push('/login');
    }

    return (
        <div>
            <p>Conferma logout.</p>
            <button onClick={confirmLogout}>Logout</button>
        </div>
    );
}



export default LogoutPage;