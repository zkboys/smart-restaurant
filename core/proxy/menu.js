const config = require('../config');
const Model = require('../models').Menu;
const BaseProxy = require('./base_proxy');

class MenuProxy extends BaseProxy {
    updateAllMenus(newMenu) {
        // TODO 应该用事务处理
        return this.model.remove({}).then(() => {
            return this.model.create(newMenu);
        });
    }

    getMenusByUser(user) {
        if (user.loginname === config.admin_name) { // 登录名为admin的用户拥有所有权限
            return this.model.find({}).lean();
        } else {
            return this.model.find({'key': {'$in': user.permissions}}).lean();
        }
    }

}

exports = module.exports = new MenuProxy(Model);

