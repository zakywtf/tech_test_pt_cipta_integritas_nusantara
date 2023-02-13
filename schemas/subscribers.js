const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    email: {
        type: String
    },
    status : {
        type:String, 
        enum:['active', 'expired'], 
        default:'active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date
    }
});

sch.index({email:1},{unique:true})
sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("subscribers", sch);