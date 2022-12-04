const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    },
    status : {
        type:String, 
        enum:['registered', 'active', 'inactive'], 
        default:'active'
    },
    role: {
        type:String, 
        enum:['user', 'operator', 'admin'], 
        default:'admin'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date
    }
});

sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("users", sch);