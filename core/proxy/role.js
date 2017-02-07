const Model = require('../models').Role;
const BaseProxy = require('./base_proxy');

class RoleProxy extends BaseProxy {
    getRoleByNameFromAllRoles(roleName) {
        return this.model.findOne({'name': new RegExp('^' + roleName + '$', "i")});
    }

}

exports = module.exports = new RoleProxy(Model);

