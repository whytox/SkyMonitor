const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
// Import routes
const register = require('./routes/Register');
const login = require('./routes/Login');
const monitor = require('./routes/Monitor');
const flights = require('./routes/Flights');
const flightPrice = require('./routes/FlightPrice');

// Api routes
// Ogni router definisce dei sottopercorsi
// per il percorso a cui viene registrato
app.use('/api/users', register); // /api/users/register
app.use('/api/users', login); // /api/users/login
app.use('/api/users', flights);
app.use('/api/', monitor);
app.use('/api/flight', flightPrice);


app.listen(3030, () => {
    console.log('[API] Server up and running on port 3030');
});