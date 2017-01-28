const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MpUserSchema = new Schema({
    name: {type: String},
    is_first_login: {type: Boolean, default: true},
    is_locked: {type: Boolean, default: false},
});

mongoose.model('MpUser', MpUserSchema);
