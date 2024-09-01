const TicketModel = require("../models/ticket.model");
const TrainModel = require("../models/train.model");
const WalletModel = require("../models/wallet.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');

const purchaseTicket = catchAsync(async (req, res) => {

    const { trainId, startStationId, endStationId } = req.body;

    const train = await TrainModel.findById(trainId).populate('stops.station');    

      if (!train) {

        return apiResponse(res, httpStatus.NOT_FOUND, {message: "Train not found"})
      }
  
      const startStop = train.stops.find(stop => stop.station._id.toString() === startStationId);
      const endStop = train.stops.find(stop => stop.station._id.toString() === endStationId);
  
      if (!startStop || !endStop) {

        return apiResponse(res, httpStatus.BAD_REQUEST, {message: "Invalid Route"})
      }
  
      const fare = calculateFare(startStop, endStop);      
  
      const wallet = await WalletModel.findOne({ user: req.user.id });

      if (wallet.balance < fare) {

        return apiResponse(res, httpStatus.BAD_REQUEST, {message: "Insufficient founds"});

      }
  
      wallet.balance -= fare;

      wallet.transactions.push({ amount: fare, type: 'debit' });
      await wallet.save();
  
      const ticket = new TicketModel({
        user: req.user.id,
        train: trainId,
        startStation: startStationId,
        endStation: endStationId,
        fare,
      });
  
      await ticket.save(); 
  
      return apiResponse(res, httpStatus.CREATED, {data: ticket})
  })

const calculateFare = (startStop, endStop) => {

  const fare = Math.abs(new Date(endStop.arrivalTime) - new Date(startStop.departureTime)) / 60000;
  return fare > 0 ? fare : 10;
};


module.exports = purchaseTicket;