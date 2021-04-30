// Voglio inviare le info raccolte nel login form
// per sapere chi si è connesso, e memorizzarlo nello stato dell'applicazione.

//import currentUser from './currentUser';

async function login({email, password}) {
    console.log("Sending a request to login with "+ email + " " + password);
    
    const options = {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch('http://localhost:3030/api/users/login',
    options);

    return response;
}

export default login;