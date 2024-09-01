const config = require("../config/config");
const ApiError = require("../utils/apiError");
const httpStatus = require('http-status');
const apiResponse = require('../utils/apiResponse');
const userRouter = require("./user.route");
const stationRouter = require("./station.route");
const trainRouter = require("./train.route");
const walletRouter = require("./wallet.route");
const ticketRouter = require("./ticket.route");

const initRoutes = (app)=> {

    app.use('/api/user', userRouter);

    app.use('/api/stations', stationRouter);

    app.use('/api/trains', trainRouter);

    app.use('/api/wallet', walletRouter);

    app.use('/api/tickets', ticketRouter);

    app.use((req, res, next) => {
        const error = new ApiError(httpStatus.NOT_FOUND);
        return next(error);
    })

    app.use((err, req, res, next) => {

        const status = err.statusCode || res.statusCode || 500;
        const stack = config.env !== "production" ? err?.stack : {}
        return apiResponse(res, status, {message: err.message}, stack)
    })

} 


module.exports = initRoutes;