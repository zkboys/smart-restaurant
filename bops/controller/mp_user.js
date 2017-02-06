const controllerDecorator = require('./../../core/common/controller-decorator');
const MpUserService = require('../../core/service/mp_user');

exports.addAndSave = controllerDecorator(async function (req, res, next) {
    const mpUser = req.body;
    const savedMpUser = await MpUserService.add(mpUser);
    res.send(savedMpUser);
});

