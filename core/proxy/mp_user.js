const Model = require('../models').MpUser;
const BaseProxy = require('./base_proxy');

class MpUserProxy extends BaseProxy {
    lock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: true});
    }

    unlock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: false})
    }
}
exports = module.exports = new MpUserProxy(Model);

