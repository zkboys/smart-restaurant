const OauthModel = require('../models').Oauth;

exports.getOauthByAppKey = function (appKey) {
    return OauthModel.findOne({app_key: appKey});
}

exports.addOauth = function (oauth) {
    return new OauthModel(oauth).save();
}