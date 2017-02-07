const controllerDecorator = require('./../../core/common/controller-decorator');
const MpUserService = require('../../core/service/mp_user');

exports.addAndSave = controllerDecorator(async function (req, res, next) {
    const mpUser = req.body;
    const savedMpUser = await MpUserService.add(mpUser);
    res.send(savedMpUser);
});


exports.delete = controllerDecorator(async function (req, res, next) {
    const id = req.body.id;
    await MpUserService.deleteById(id);
    res.sendSuccess();
});

exports.toggleLock = controllerDecorator(async function (req, res, next) {
    const id = req.body.id;
    const isLocked = req.body.isLocked;
    const user = await MpUserService.toggleLock(id, isLocked);
    res.send(user);
});

exports.update = controllerDecorator(async function (req, res, next) {
    const user = req.body;
    const updatedUser = await MpUserService.update(user);
    res.send(updatedUser);
});

exports.getAccountByAccount = controllerDecorator(async function (req, res, next) {
    const account = req.params.account;
    const existedAccount = await MpUserService.getAccountByAccount(account);
    res.send(existedAccount || false);
});


exports.getByPage = controllerDecorator(async function (req, res, next) {
    const currentPage = parseInt(req.query.currentPage, 10) || 1;
    const pageSize = Number(req.query.pageSize || 10);
    const queries = {};
    ['account'].forEach(v => {
        const value = req.query[v];
        if (value) {
            queries[v] = value;
        }
    });

    const {results, totalCount} = await MpUserService.getByPage(currentPage, pageSize, queries);
    res.send({
        results,
        totalCount,
    });
});