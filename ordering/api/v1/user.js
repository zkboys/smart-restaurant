const controllerDecorator = require('../../../core/common/controller-decorator');

exports.getUserById = controllerDecorator(async function (req, res) {
    const userId = req.query.userId;
    console.log(userId);
    const user = req.currentUser; // 当前登录用户
    res.send({
        userName: user.name,
        loginName: user.loginname
    });
});