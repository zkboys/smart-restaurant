const controllerDecorator = require('../../../core/common/controller-decorator');
const userService = require('../../../core/service/user');
const oauthTokenService = require('../../../core/service/oauth_token');

exports.signIn = controllerDecorator(async function (req, res) {
    console.log(req.method);
    const userName = req.query.userName;
    const passWord = req.query.passWord;
    const scope = req.query.scope;
    const appKey = req.headers.appkey;

    const user = await userService.getUserByLoginNameAndPass(userName, passWord);
    const oauthToken = await oauthTokenService.createOauthToken(appKey, scope, user._id);
    res.send(oauthToken);
});

exports.refreshToken = controllerDecorator(async function (req, res, next) {

    const appKey = req.query.appKey;
    const refreshToken = req.query.refreshToken;

    const oauthToken = await oauthTokenService.refreshToken(appKey, refreshToken);

    res.send(oauthToken);
});