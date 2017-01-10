const OauthProxy = require('../proxy/oauth');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;

exports.getOauthByAppKey = async function (appKey) {
    const oauth = await OauthProxy.getOauthByAppKey(appKey);
    if (!oauth) {
        throw new ServiceError(message.oauthIsNotExisted);
    }
    return oauth;
}





















