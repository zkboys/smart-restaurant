const Model = require('../models').Merchant;
const BaseProxy = require('./base_proxy');

class MerchantProxy extends BaseProxy {
    getByOwnerId(ownerId) {
        return this.model.find({owner_id: ownerId});
    }
}
exports = module.exports = new MerchantProxy(Model);
