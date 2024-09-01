const httpStatus = require('http-status')


module.exports = (res, status, data = {}, optional = {}) => {

    const returnObj =  {};    

    returnObj["data"] = data && data.data ? data.data : null;
    returnObj["message"] = data && data.message ? data.message : null;
    returnObj["stack"] = typeof optional !== "undefined" && Object.keys(optional).length > 0 ? optional : null;

    res.status(status);
    return res.json(returnObj);
}