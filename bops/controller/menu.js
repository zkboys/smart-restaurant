const MenuService = require('../../core/service/menu');
const controllerDecorator = require('./../../core/common/controller-decorator');

exports.getAllMenus = controllerDecorator(async function (req, res) {
    const menus = await MenuService.getAllMenus();
    res.send(menus);
});

exports.updateAllMenus = controllerDecorator(async function (req, res, next) {
    const menus = req.body.menus;
    await MenuService.updateAllMenus(menus);
    res.sendSuccess();
});
