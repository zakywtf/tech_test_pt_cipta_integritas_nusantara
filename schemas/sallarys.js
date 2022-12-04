const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    basic_sallary: {
        type: Number,
        default: 0
    },
    allowance: {
        type: Number,
        default: 0
    },
    payday: {
        type: Date
    },
    notes: {
        type: String,
    },
    employee_id: {
        type: Schema.Types.ObjectId,
        autopopulate: { select: 'nik name' },
        ref: 'employees'
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

module.exports = mongoose.model("sallarys", sch);