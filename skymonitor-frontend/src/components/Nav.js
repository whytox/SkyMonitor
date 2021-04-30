import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
//import {isLogged} from '../API/currentUser';
import UserContext from '../API/currentUser';

function Nav() {
  const {user} = useContext(UserContext);
  //const logged = isLogged();

  const link_style = {
    color: 'white',
  };

  if (!user)
    return (
      <nav>{user}
         <Link style={link_style} to="/"><h3>SKYMONITOR</h3></Link>
        <ul className='nav-links'>
          <li>
            <Link style={link_style} to="/login">Login</Link>
          </li>
          <li>
            <Link style={link_style} to="/register">Register</Link>
          </li>
      </ul>
    </nav>
    );
  else 
      return (
        <nav>
          <Link style={link_style} to="/"><h3>SKYMONITOR</h3></Link>
        <ul className='nav-links'>
          <li>
            <Link style={link_style} to="/monitor">Monitora Volo</Link>
          </li>
          <li>
            <Link style={link_style} to="/flights">I tuoi voli</Link>
          </li>
          <li>
            <Link style={link_style} to="/logout">Logout</Link>
          </li>
      </ul>
    </nav>
      );
}

export default Nav;
