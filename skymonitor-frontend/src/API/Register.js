async function register(user) {
    console.log("Sending a request to register user: " + user);
    
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch('http://localhost:3030/api/users/register', options)
    .then(res => res.text());
    return response;
    
}

export default register;