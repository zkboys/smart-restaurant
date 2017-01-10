const OauthTokenService = require('../service/oauth_token');
const UserService = require('../service/user');

exports = module.exports = async function (req, res, next) {
    const accessToken = req.headers.accesstoken;
    try {
        const oauthToken = await OauthTokenService.checkAccessToken(accessToken);
        // 获取用户存储到 req.currentUser中，以后可以使用 req.currentUser 获取当前登录的用户
        const userId = oauthToken.user_id;
        const user = await UserService.getUserById(userId);
        req.currentUser = user;
        next();
    } catch (error) {
        res.sendError(error);
    }
};