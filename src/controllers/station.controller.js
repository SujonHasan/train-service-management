
const StationModel = require("../models/station.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');

const createStation = catchAsync(async (req, res) => {
    const { name, location } = req.body;
    
    const station = new StationModel({ name, location });
    await station.save();
    return apiResponse(res, httpStatus.OK, {data: station})
  })

const updateStation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    const station = await StationModel.findByIdAndUpdate(
        id,
        { name, location },
        { new: true }
      );
    return apiResponse(res, httpStatus.OK, {data: station})
  })

const getStations = catchAsync(async (req, res) => {

    const stations = await StationModel.find();
      
    return apiResponse(res, httpStatus.OK, {data: stations})
  })

module.exports = {

    createStation,
    updateStation,
    getStations
}