const Model = require('../models').User;
const BaseProxy = require('./base_proxy');

class UserProxy extends BaseProxy {
    getUsersByNames(banes) {
        return this.model.find({loginname: {$in: names}});
    }

    getUserByLoginName(loginName) {
        return this.model.findOne({'loginname': new RegExp('^' + loginName + '$', "i"), is_deleted: false});
    }

    getUserByLoginNameFromAllUsers(loginName) {
        return this.model.findOne({'loginname': new RegExp('^' + loginName + '$', "i")});
    }

    lock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: true, update_at: new Date()});
    }

    unlock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: false, update_at: new Date()})
    }
}

exports = module.exports = new UserProxy(Model);

