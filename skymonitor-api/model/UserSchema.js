const joi = require('@hapi/joi');

module.exports = joi.object({
    name: joi.string()
        .min(6)
        .max(20)
        .required(),
    email:  joi.string()
        .email()
        .required(),
    password: joi.string()
        .required()
        .min(6)
});