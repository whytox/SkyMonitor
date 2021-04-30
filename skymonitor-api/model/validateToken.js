const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // * READ TOKEN
    const user_token = req.body.token;
    //console.log(user_token);

    // * DECODE TOKEN WITH SECRET
    try {
        const {_id} = jwt.verify(user_token, "skymonitor_secret");
        req.id = _id;
        next(); // * NEXT REQUEST HANDLER
    } catch (error) {
        res.status(401).send('Unhautorized');
    }

};