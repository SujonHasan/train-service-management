const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const {Schema} = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});


schema.statics.isUnique = async function (email) {
    const user = await this.findOne({email});
        
    if (!user) {
        return true;
    } else {
        return {email}
    }
};

schema.pre("save", async function (next) {

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 9);
    }

    next();
})

schema.methods.isPasswordMatch = async function(password){
    return bcrypt.compare(password, this.password);
}

schema.methods.toJSON = function () {
    let obj = this.toObject(); 

    delete obj.password;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("user", schema);

module.exports = {
    Usermodel: model
} 