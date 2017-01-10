const OauthTokenProxy = require('../proxy/oauth_token');
const OauthService = require('./oauth');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;
const uuidV4 = require('uuid/v4');

const REFRESH_TOKEN_EXPIRES_IN = 90 * (24 * 60 * 60); // refresh token过期时间，单位分，90天

exports.createOauthToken = async function (appKey, scope, userId) {
    const oauth = await OauthService.getOauthByAppKey(appKey);

    // 检查scope
    const scopes = oauth.scope.split(',');
    const paramScopes = scope.split(',');

    // 取交集
    const realScopes = paramScopes.filter(s => scopes.indexOf(s) != -1);
    if (!realScopes || !realScopes.length) {
        throw new ServiceError(message.scopeInvalid);
    }
    const realScopeStr = realScopes.join(',');
    const refreshToken = uuidV4();
    const nowTime = (new Date()).getTime();

    const oauthToken = {
        oauth_id: oauth._id,
        user_id: userId,
        app_key: appKey,
        scope: realScopeStr,
        version_id: null, // TODO 这个字段是干嘛的？
        access_token: uuidV4(),
        expired_at: nowTime + oauth.expires_in * 1000,
        refresh_token: refreshToken,
        old_refresh_token: refreshToken,
        refresh_token_expired_at: nowTime + REFRESH_TOKEN_EXPIRES_IN * 1000,
    }

    await OauthTokenProxy.createOauthToken(oauthToken);

    return {
        accessToken: oauthToken.access_token,
        refreshToken: oauthToken.refresh_token,
        scopes: oauthToken.scope,
        expiresIn: oauth.expires_in, // 单位秒
    };
};

exports.checkAccessToken = async function (accessToken) {
    const at = await OauthTokenProxy.getOauthTokenByAccessToken(accessToken);
    if (!at) {
        throw new ServiceError(message.accessTokenInvalid);
    }

    const nowTime = new Date().getTime();
    if (nowTime > at.expired_at) {
        throw new ServiceError(message.accessTokenExpired);
    }

    return at;
}

exports.refreshToken = async function (appKey, refreshToken) {
    const oauth = await OauthService.getOauthByAppKey(appKey);
    const nowTime = new Date().getTime();
    let oauthToken = await OauthTokenProxy.getOauthTokenByAppKeyAndRefreshToken(appKey, refreshToken);
    if (!oauthToken) {
        oauthToken = await OauthTokenProxy.getOauthTokenByAppKeyAndOldRefreshToken(appKey, refreshToken);
    }
    if (!oauthToken) {
        throw new ServiceError(message.refreshTokenInvalid);
    }
    if (nowTime > oauthToken.refresh_token_expired_at) {
        await OauthTokenProxy.delete(oauthToken);
        throw new ServiceError(message.refreshTokenInvalid);
    }

    oauthToken.old_refresh_token = oauthToken.refresh_token;
    oauthToken.access_token = uuidV4();
    oauthToken.expired_at = nowTime + oauth.expires_in * 1000;
    oauthToken.refresh_token = uuidV4();
    oauthToken.refresh_token_expired_at = nowTime + REFRESH_TOKEN_EXPIRES_IN * 1000;
    await OauthTokenProxy.update(oauthToken);

    return {
        accessToken: oauthToken.access_token,
        refreshToken: oauthToken.refresh_token,
        scopes: oauthToken.scope,
        expiresIn: oauth.expires_in, // 单位秒
    }
};





















