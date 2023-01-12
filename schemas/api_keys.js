const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    key: {
        type: String,
    },
    apps: {
        type: String,
    },
    ip_whitelist: {
        type: Array,
    },
    limits: {
        type: Number,
        default: 100
    },
    status : {
        type:String, 
        enum:['active', 'inactive'], 
        default:'active'
    },
    isLimited: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

sch.index({key:1},{unique:true})
sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("api_keys", sch);