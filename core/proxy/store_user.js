const Model = require('../models').StoreUser;
const BaseProxy = require('./base_proxy');

class StoreUserProxy extends BaseProxy {
    getByMchIdAndUserId(mchId, userId) {
        return this.getByQuery({mch_id: mchId, user_id: userId});
    }

    deleteByStoreId(storeId) {
        return this.model.findOneAndUpdate({store_id: storeId}, {is_deleted: true, update_at: new Date()});
    }
}
exports = module.exports = new StoreUserProxy(Model);
