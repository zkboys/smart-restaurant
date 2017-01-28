const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MpAccount = new Schema({
    user_id: {type: String},
    account: {type: String},
    type: {type: String}, // mobile email
});

mongoose.model('MpAccount', MpAccount);
