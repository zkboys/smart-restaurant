const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 门店基本信息表
 * 一个门店只能属于一个门店，但是可以被多个账号拥有，通过store_user表关联
 */
const StoreSchema = new Schema({
    mch_id: Schema.Types.ObjectId, // 所属品牌的id
    name: {type: String},
    logo: {type: String},
    type: {type: String}, // dine 正餐 take 外卖 fast 快餐 等
    province: {type: String}, // 省
    city: {type: String}, // 市
    district: {type: String}, // 区街道
    address: {type: String}, // 详细地址
    mobile: {type: String},
    tel: {type: String}, // 座机号
    lng: {type: String}, // 经度
    lat: {type: String}, // 纬度
    state: {type: String}, // 状态 enabled 可用 disabled 不可用
    expired_at: {type: String}, // 到期时间
    remark: {type: String}, // 备注
    creator_id: {type: String}, // 创建用户id
});

mongoose.model('Store', StoreSchema);
