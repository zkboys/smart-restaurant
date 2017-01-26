const MenuProxy = require('../proxy/menu');

exports.getAllMenus = async function () {
    return await MenuProxy.getAll();
};

exports.updateAllMenus = async function (menus) {
    return await MenuProxy.updateAllMenus(menus)
}