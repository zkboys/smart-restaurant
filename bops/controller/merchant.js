const controllerDecorator = require('./../../core/common/controller-decorator');
const mchService = require('../../core/service/merchant');

exports.addAndSave = controllerDecorator(async function (req, res, next) {
    const merchant = req.body;
    const savedMerchant = await mchService.add(merchant);
    res.send(savedMerchant);
});


exports.delete = controllerDecorator(async function (req, res, next) {
    const id = req.body.id;
    await mchService.deleteById(id);
    res.sendSuccess();
});

exports.update = controllerDecorator(async function (req, res, next) {
    const user = req.body;
    const updatedMerchant = await mchService.update(user);
    res.send(updatedMerchant);
});
