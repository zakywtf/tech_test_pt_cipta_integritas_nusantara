const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },  
    phone: {
        type: String,
    },
    company: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    affiliation_sector: {
        type: String,
    },
    message: {
        type: String,
    },
    status : {
        type:String, 
        enum:['registered', 'verified', 'decline'], 
        default:'registered'
    },
});

sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("book_appointment", sch);