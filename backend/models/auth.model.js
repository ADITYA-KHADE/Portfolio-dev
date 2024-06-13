const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength:2
    }
},{
    timestamps: true,
});

const AuthModel = mongoose.model('User', modelSchema)

module.exports = AuthModel