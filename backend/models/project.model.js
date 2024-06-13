const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    },
    github:{
        type: String,
        required: true,
    },
    deploy:{
        type: String,
        required: true,
    },
    technologies:{
        type: Array,
        required: true,
        default:[]
    }
},{
    timestamps: true,
});

const Projectmodel = mongoose.model('projects', modelSchema)

module.exports = Projectmodel