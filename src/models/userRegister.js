const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true    //Not a validator
    },
    password:{
        type:String,
        required: true
    },
    confirmpassword:{
        type:String,
        required: true
    }
});

//Now create collection and define the model

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;