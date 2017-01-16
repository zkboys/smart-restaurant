const controllerDecorator = require('../../../core/common/controller-decorator');

const UserService = require('../../../core/service/user');

exports.getUserById = controllerDecorator(async function (req, res) {
    const userId = req.query.userId;
    console.log(userId);
    const user = req.currentUser; // 当前登录用户
    res.send({
        userName: user.name,
        loginName: user.loginname
    });
});

exports.getCurrentLoginUser = controllerDecorator(async function (req, res) {
    const user = req.currentUser; // 当前登录用户
    res.send({
        name: user.name,
        loginname: user.loginname
    });
});

exports.getAllUsers = controllerDecorator(async function (req, res) {
    const mchId = req.query.mchId;
    const storeId = req.query.storeId;
    console.log(mchId, storeId);
    const user = req.currentUser; // 当前登录用户

    // TODO 根据mchId 和 storeId 获取用户列表
    const result = await UserService.getByPage();
    result.users.forEach(user => user.userId = user._id);
    res.send({results: result.users});
});