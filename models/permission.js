var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = Schema({
    user_id: {type: String, required: true},
    service_id: {type: String, required: true},
    status: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Permission', PermissionSchema, "permissions");