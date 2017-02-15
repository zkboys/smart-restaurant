const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * mp账号与品牌对应表，用来标记这个账号可用品牌有哪些
 */
const MerchantUserSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    mch_id: Schema.Types.ObjectId,
});

mongoose.model('MerchantUser', MerchantUserSchema);
