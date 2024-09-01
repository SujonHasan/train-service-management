const Joi = require('joi');
const { validate } = require('../utils/validate');

const register = validate({
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().regex(/^[\w]{6,30}$/).required()
    })
})

const login = validate({
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
})

module.exports = {
    registerValidation: register,
    loginValidation: login
}