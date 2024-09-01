const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "station",
    index: false,
  },
  arrivalTime: { type: Date, required: false },
  departureTime: { type: Date, required: false },
}, {_id:  false});

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stops: [
    {
      type: stopSchema,
      required: false,
      default: [],
    },
  ],
});

schema.methods.toJSON = function () {
  let obj = this.toObject();

  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;

  return obj;
};

const TrainModel = mongoose.model("train", schema);

module.exports = TrainModel;
