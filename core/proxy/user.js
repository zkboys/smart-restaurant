const UserModel = require('../models').User;
const BaseProxy = require('./base_proxy');

class UserProxy extends BaseProxy {
    getUsersByNames(banes) {
        return this.model.find({loginname: {$in: names}}).lean();
    }

    getUserByLoginName(loginName) {
        return this.model.findOne({'loginname': new RegExp('^' + loginName + '$', "i"), is_deleted: false}).lean();
    }

    getUserByLoginNameFromAllUsers(loginName) {
        return this.model.findOne({'loginname': new RegExp('^' + loginName + '$', "i")}).lean();
    }

    lock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: true, update_at: new Date()}).lean();
    }

    unlock(id) {
        return this.model.findOneAndUpdate({_id: id}, {is_locked: false, update_at: new Date()}).lean()
    }
}

exports = module.exports = new UserProxy(UserModel);

