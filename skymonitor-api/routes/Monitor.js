const router = require('express').Router();
const validateToken = require('../model/validateToken');
const saveFlights = require('../model/saveFlights');
const saveMonitor = require('../model/saveMonitor');

/*
TODO: validate data before saving it
// TODO: save airports
// TODO: save flights
// TODO: save monitor data

*/
router.post('/monitor', validateToken, saveFlights, saveMonitor, (req, res, next) => {
    console.log("received reques");
    res.body = req.id;
    res.header('Content-type', 'text/plain').send("Data saved.");
});

module.exports = router;