const router = require('express').Router();
const validateToken = require('../model/validateToken');
const fetchFlights = require('../model/fetchFlights');

/*
* This API routes return the user's list
* of monitored flights.
*/

router.post('/flights', validateToken, fetchFlights);

module.exports = router;

