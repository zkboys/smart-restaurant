const RoleModel = require('../models').Role;
const BaseProxy = require('./base_proxy');

class RoleProx extends BaseProxy {
    getRoleByNameFromAllRoles(roleName) {
        return this.model.findOne({'name': new RegExp('^' + roleName + '$', "i")}).lean();
    }

}

exports = module.exports = new RoleProx(RoleModel);

