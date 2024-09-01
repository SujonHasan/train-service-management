const TrainModel = require("../models/train.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');

const createTrain = catchAsync(async (req, res) => {
    const { name, stops } = req.body;

    const trainCheck = await TrainModel.findOne({name});

    if(trainCheck) return apiResponse(res, httpStatus.NOT_ACCEPTABLE, {message: "Train Alreday exists"})
    
    const train = new TrainModel({ name, stops });
    await train.save();

    return apiResponse(res, httpStatus.OK, {data: train})
  })

const updateTrain = catchAsync(async (req, res) => {

    const { id } = req.params;
    const { name, stops: newStops} = req.body;
        
    const train = await TrainModel.findById({_id: id});
      
    if (!train) {
  
      return apiResponse(res, httpStatus.NOT_FOUND, {message: "Train not Found"})
    
    }

    const updatedStops = train.stops.map(existingStop => {

      const matchingNewStop = newStops.find(newStop => 
        newStop.station.toString() === existingStop.station.toString()
      );

      return matchingNewStop 
      ? { ...existingStop.toObject(), ...matchingNewStop } 
      : existingStop;

    });

    newStops.forEach(newStop => {
      const isExisting = updatedStops.some(
          stop => stop.station.toString() === newStop.station.toString()
      );

      if (!isExisting) {
          updatedStops.push(newStop);
      }
    });     

    const updatetrain = await TrainModel.findByIdAndUpdate(id, {name, stops: updatedStops}, {new: true})

    return apiResponse(res, httpStatus.OK, {data: updatetrain})
       
})
  
const getTrains = catchAsync(async (req, res) => {

  const trains = await TrainModel.find().populate('stops.station', 'name location');

  return apiResponse(res, httpStatus.OK, {data: trains})

})
  
const getTrainById = catchAsync(async (req, res) => {

    const { id } = req.params;

    const train = await TrainModel.findById(id).populate('stops.station', 'name location');

    if (!train) {
        return apiResponse(res, 404, {message: "Train not found"})
    }
    return apiResponse(res, httpStatus.OK, {data: train});
  })


  module.exports = {
    createTrain,
    updateTrain,
    getTrains,
    getTrainById
  }