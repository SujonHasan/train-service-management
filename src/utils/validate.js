const Joi = require('joi')
const {pick} = require('lodash');
const httpStatus = require('http-status');
const apiResponse = require('./apiResponse');

const validate = (schema) => async (req, res, next) => {

    const validSchema = pick(schema, ['params', 'query', 'body']);    

    const object = pick(req, Object.keys(validSchema));

    const {value, error} = Joi.compile(validSchema)
        .prefs({errors: {label: 'key'}})
        .validate(object, {abortEarly: false})    
    
    if(error){

        const message = error && error.details && error.details.length ? error.details[0].message.replace(/"/g, '') : "Something went wrong";

        const err = {};

        await error.details.forEach((e) => {
            err[e.path[1]] = e.message.toString().replace(/"/g, '');
        });        

        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, { message }, err)
    }

    Object.assign(req, value);
    return next();
}

module.exports = {validate}