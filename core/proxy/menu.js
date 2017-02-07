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
        if (user.is_admin) {
            return this.model.find({});
        } else {
            return this.model.find({'key': {'$in': user.permissions}});
        }
    }

}

exports = module.exports = new MenuProxy(Model);

