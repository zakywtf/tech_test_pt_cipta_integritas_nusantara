const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    nik:{
        type: String,
    },
    name: {
        type: String,
    },
    address:{
        type: String,
    },
    phone: {
        type: String,
    },
    email:{
        type: String,
    },
    position_id: {
        type: Schema.Types.ObjectId,
        autopopulate: { select: 'code name' },
        ref: 'positions'
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

module.exports = mongoose.model("employees", sch);