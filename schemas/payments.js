const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    invoice: {
        type: String,
        default: null
    },
    total_price: {
        type: Number,
        default: 0
    },
    apps: {
        type: String,
        default: null
    },
    payment_type: {
        type: String,
        default: null
    },
    customer_details: {
        type: Schema.Types.Mixed,
        default: null
    },
    status: {
        type:String, 
        enum:['accept', 'denied', 'pending', 'expired'], 
        default:'pending'
    },
    callback_url: {
        type: String,
        default: null
    },
    midtrans_details: {
        type: Schema.Types.Mixed,
        default: null
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

module.exports = mongoose.model("payments", sch);