const WalletModel = require("../models/wallet.model");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require('http-status');

const addFunds = catchAsync(async (req, res) => {

    const { amount } = req.body;
    
    const wallet = await WalletModel.findOne({ user: req.user._id });

      if (!wallet) {
        return apiResponse(res, httpStatus.NOT_FOUND, {message: "Wallet not found"});

      }
  
    wallet.balance += amount;
    wallet.transactions.push({ amount, type: 'credit' });
    await wallet.save();
  
    return apiResponse(res, httpStatus.OK, {data: wallet});

  })

const getWallet = catchAsync(async (req, res) => {

    const wallet = await WalletModel.findOne({ user: req.user._id });

      if (!wallet) {
        return apiResponse(res, httpStatus.NOT_FOUND, {message: "Wallet not found"});
      }
      return apiResponse(res, httpStatus.OK, {data: wallet});
  })

module.exports = {
    addFunds,
    getWallet
}