var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = Schema({
    user_id: {type: String, required: true},
    service_id: {type: String, required: true},
    manager_id: {type: String, required: false},
    from_lat: {type: Number, required: true},
    from_lng: {type: Number, required: true},
    to_lat: {type: Number, required: true},
    to_lng: {type: Number, required: true},
    from_time: Date,
    delivery_time: Date,
    status: ['pending','acepted','on way','delivered','canceled'],
    qual: Number,
    msg: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Request', RequestSchema, "requests");