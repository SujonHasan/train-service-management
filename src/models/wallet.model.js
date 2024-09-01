const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['credit', 'debit'], required: true },
});

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, default: () => ({}) },
  balance: { type: Number, default: 0 },
  transactions: [{
    type: transactionSchema,
    default: []
  }],
});

schema.methods.toJSON = function () {
    let obj = this.toObject(); 

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const WalletModel = mongoose.model('wallet', schema);

module.exports = WalletModel;