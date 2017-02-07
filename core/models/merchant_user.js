const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantUserSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    mch_id: Schema.Types.ObjectId,
});

mongoose.model('MerchantUser', MerchantUserSchema);
