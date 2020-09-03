var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = Schema({
    user_id: {type: String, required: true},
    name: {type: String, required: true},
    description: String,
    status: {type: Boolean, default: false},
    image: String,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Service', ServiceSchema, "services");