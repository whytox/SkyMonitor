import React, { useState, useContext} from 'react';
import {Link} from 'react-router-dom';

function HomePage() {


    return (
        <div >
            <h3>Benvenuto su SkyMonitor</h3>
            <p>Qui puoi:
                <ul >
                     <li>
                        <Link to="/register">Registrarti</Link> per accedere alle funzionalità
                     </li> 
                     <li>
                        <Link to="/monitor">Monitorare un volo</Link>.
                     </li>
                     <li>
                         Vedere i dati raccolti sui <Link to="/flights">tuoi voli</Link>
                     </li>
                </ul>
            </p>
        </div>
    );
}

export default HomePage;