const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MpPassword = new Schema({
    account_id: {type: String},
    password: {type: String},
    salt: {type: String},
});

mongoose.model('MpPassword', MpPassword);
