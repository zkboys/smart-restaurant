const OauthProxy = require('../proxy/oauth');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;
const packageJson = require('../../package.json');
const md5 = require('../common/tools').md5;

exports.checkSignature = async function ({appKey, timestamp, ticket, sign, version, accessToken, url, params, authenticated,}) {

    let paramsStr = '';
    if (params) {
        const keys = Object.keys(params).map(key => key);
        keys.sort();
        keys.forEach(key => {
            paramsStr += key + params[key];
        })
    }
    const oauth = await OauthProxy.getOauthByAppKey(appKey);
    if (!oauth) throw new ServiceError(message.oauthIsNotExisted);
    const appSecret = oauth.app_secret;

    if (!ticket) throw new ServiceError(message.ticketInvalid);
    if (!timestamp) throw new ServiceError(message.timestampInvalid);
    if (!version) throw new ServiceError(message.versionInvalid);
    version = Number(version);
    if (version > packageJson.versionCode || version < 1) throw new ServiceError(message.versionInvalid);

    const list = [];
    list.push(timestamp);
    list.push(ticket);
    list.push(version);
    list.push(appKey);
    if (authenticated) {
        list.push(accessToken);
    }
    list.push(appSecret);
    list.push(url);
    list.push(paramsStr);

    list.sort();
    let str = '';

    list.forEach((v, i) => {
        str += v;
        if (i + 1 < list.length) {
            str += '&';
        }
    });

    str = md5(str).toUpperCase();
    if (sign != str) {
        throw new ServiceError(message.signInvalid);
    }
};




















