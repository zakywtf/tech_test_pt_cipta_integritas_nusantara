const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    cat_service_id: {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name title description' }, 
        ref: 'category_services'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String
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

module.exports = mongoose.model("services", sch);