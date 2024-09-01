const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status'); 
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const { Usermodel } = require('../models/user.model');


const isAuthenticated = catchAsync(async(req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, config.accessSecret)

    const user = await Usermodel.findById(decodedToken?.user?._id).select("-password -refreshToken")

    if (!user) {
        
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Access Token")
    }

    req.user = user;

    next()
})


module.exports = {
    isAuthenticated
}