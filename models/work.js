var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = Schema({
    user_id: {type: String, required: true},
    service_id: {type: String, required: true},
    time: Number,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Work', WorkSchema, "works");