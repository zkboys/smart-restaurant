const Model = require('../models').Store;
const BaseProxy = require('./base_proxy');

class StoreProxy extends BaseProxy {
    getByMchId(mchId) {
        return this.getByQuery({mch_id: mchId});
    }
}
exports = module.exports = new StoreProxy(Model);
