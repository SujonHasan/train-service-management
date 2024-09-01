
const catchAsync = require("../utils/catchAsync");
const apiResponse = require('../utils/apiResponse')
const httpStatus = require('http-status');
const { Usermodel } = require("../models/user.model");
const mongoose = require("mongoose");
const config = require("../config/config");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const validationError = require('../utils/validationError')
const WalletModel = require("../models/wallet.model");

const generateToken = async (user, exp, secret) => {

    return jwt.sign(
        {user},
        secret,
        {
            expiresIn: exp
        }
    )
}

const register = catchAsync( async (req, res) => {

    const {name, email, password} = req.body;

    const newUser = new Usermodel({name, email, password});    

    const err = newUser.validateSync();
    if(err instanceof mongoose.Error){

        const validation = await validationError.requiredCheck(err.errors)
        
        return apiResponse(res, httpStatus.UNPROCESSABLE_ENTITY, validation, err)
    }

    const validation = await  validationError.uniqueCheck(await Usermodel.isUnique(email))        

    if(Object.keys(validation).length === 0){

        const user = await newUser.save();

        const newwallet = new WalletModel({user: user?._id})
        const wallet = await newwallet.save();

        const accessToken = await generateToken(user, config.accessExpirationMinutes, config.accessSecret);

        return apiResponse(res, httpStatus.CREATED, {
            data: { 
                access: {
                    token: accessToken
                },
                wallet,
                user: user,
            },
            message: "Registration Complete"
        })
    }
    else {
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "validation Required"}, validation)
    }    

})

const login = catchAsync(async (req, res ) => {

    const {email, password} = req.body;

    const user = await Usermodel.findOne({email});
 
    if(!user){
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: 'Invalid email. Please register first...'});
    }else if(! await user.isPasswordMatch(password)){
        return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Password not matched"})
    }

    const accessToken = await generateToken(user, config.accessExpirationMinutes, config.accessSecret);

    return apiResponse(res, httpStatus.CREATED, {
        data: {
            access: {
                token: accessToken
            },
            user,
        },
        message: "Login Successfull"
    })

})

module.exports = {
    register,
    login
}