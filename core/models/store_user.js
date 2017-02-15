const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * mp账号与门店对应表，用来标记这个账号可用门店有哪些
 * 前提是mp账号需要拥有这个门店的品牌
 */
const StoreUserSchema = new Schema({
    mch_id: Schema.Types.ObjectId,
    store_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
});

mongoose.model('StoreUser', StoreUserSchema);
