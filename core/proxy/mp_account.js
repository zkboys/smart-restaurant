const Model = require('../models').MpAccount;
const BaseProxy = require('./base_proxy');

class MpAccountProxy extends BaseProxy {
    getByAccount(account) {
        return this.model.findOne({'account': new RegExp('^' + account + '$', "i")});
    }

    deleteByMpUserId(mpUserId) {
        return this.model.findOneAndUpdate({user_id: mpUserId}, {is_deleted: true});
    }
}

exports = module.exports = new MpAccountProxy(Model);

