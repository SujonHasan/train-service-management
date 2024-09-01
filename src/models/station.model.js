const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { 
    type: String, required: true, unique: true 
},
  location: {
     type: String, required: true 
    },
});

schema.methods.toJSON = function () {
    let obj = this.toObject(); 

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const StationModel = mongoose.model("station", schema);

module.exports = StationModel;
