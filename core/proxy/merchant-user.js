const Model = require('../models').MerchantUser;
const BaseProxy = require('./base_proxy');

class MerchantUserProxy extends BaseProxy {
    getByUserId(userId) {
        return this.model.find({user_id: userId});
    }

    getByUserIds(userIds) {
        return this.model.find({user_id: {$in: userIds}});
    }

    deleteByMchId(mchId) {
        return this.model.findOneAndUpdate({mch_id: mchId}, {is_deleted: true, update_at: new Date()});
    }
}

exports = module.exports = new MerchantUserProxy(Model);

