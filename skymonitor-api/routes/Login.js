const router = require('express').Router();
const validateLogin = require('../model/validateLogin.js');
const fetchUserInfo = require('../model/fetchUserInfo');
const jwt = require('jsonwebtoken');

/*
    * API router che ritorna l'utente loggato
    * e il suo JSON token per le richieste riservate.
*/
router.post('/login', validateLogin, fetchUserInfo, function(req, res){
    //res.send("Logged as: " + JSON.stringify(req.user));
    console.log(JSON.stringify(res.user));
    const token = jwt.sign({_id: res.user.id}, "skymonitor_secret");
    res.user.token = token;
    res.header('Content-type', 'application/json').send(JSON.stringify(res.user));

});

module.exports = router;