const mongoose = require('mongoose');

// const schema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//   train: { type: mongoose.Schema.Types.ObjectId, ref: 'train', required: true },
//   startStation: { type: mongoose.Schema.Types.ObjectId, ref: 'station', required: true },
//   endStation: { type: mongoose.Schema.Types.ObjectId, ref: 'station', required: true },
//   fare: { type: Number, required: true },
//   purchaseDate: { type: Date, default: Date.now },
// });

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    train: { type: mongoose.Schema.Types.ObjectId, ref: 'train', required: true },
    startStation: { type: mongoose.Schema.Types.ObjectId, ref: 'station', required: true },
    endStation: { type: mongoose.Schema.Types.ObjectId, ref: 'station', required: true },
    fare: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
    expirationDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  });
  
schema.index({ expirationDate: 1 }, { expireAfterSeconds: 0 });

schema.methods.toJSON = function () {
    let obj = this.toObject(); 

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const TicketModel = mongoose.model('ticket', schema);

module.exports = TicketModel;
