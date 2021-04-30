const joi = require('@hapi/joi');

const login_scheme = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

module.exports = (req, res, next) => {
    console.log("Received login request.");
    const user = req.body;
    const {error} = login_scheme.validate(user);
    if (error) return res.status(400).send(error.details[0].message);
    // valid data:
    req.user = user;
    next();
}