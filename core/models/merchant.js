const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
    name: {type: String},
    logo: {type: String},
    mobile: {type: String},
    tel: {type: String}, // 座机号
    state: {type: String}, // 状态：verifying（审核中），verified（审核通过）,reject(审核未通过)，cancel(审核未通过删除)
    owner_id: Schema.Types.ObjectId, // 所有者id
});

mongoose.model('Merchant', MerchantSchema);
