const mongoose = require('mongoose');

const skillsmodelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    image:{
        dark:{
            type: String,
            required: true,
        },
        light:{
            type: String,
            required: true,
        }
    },
    url:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});

const Skillsmodel = mongoose.model('skills', skillsmodelSchema)

module.exports = Skillsmodel