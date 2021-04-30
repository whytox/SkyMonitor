const userSchema = require('./UserSchema');

module.exports = (req, res, next) => {
    console.log("Received Registration Request:" + req.body);
    const user = req.body;
    const {error} = userSchema.validate(user);
    console.log(error);
    if (error) return res.status(400).send(error.details[0].message);
    req.user = req.body;
    next();
}