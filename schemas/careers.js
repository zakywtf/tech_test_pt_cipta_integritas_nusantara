const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    position: {
        type: String,
    },
    job: {
        type: String,
    },  
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    work_type: {
        type: String,
    }
});

sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("careers", sch);