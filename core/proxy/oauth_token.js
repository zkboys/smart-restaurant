const OauthTokenModel = require('../models').OauthToken;

exports.getOauthTokenByUserId = function (userId) {
    return OauthTokenModel.findOne({user_id: userId});
};

exports.getOauthTokenByAccessToken = function (accessToken) {
    return OauthTokenModel.findOne({access_token: accessToken});
}

exports.createOauthToken = function (oauthToken) {
    return new OauthTokenModel(oauthToken).save();
};

exports.getOauthTokenByAppKeyAndRefreshToken = function (appKey, refreshToken) {
    return OauthTokenModel.findOne({app_key: appKey, refresh_token: refreshToken});
};

exports.getOauthTokenByAppKeyAndOldRefreshToken = function (appkey, refreshToken) {
    return OauthTokenModel.findOne({app_key: appKey, old_refresh_token: refreshToken});
};

exports.delete = function (oauthToken) {
    return new OauthTokenModel(oauthToken).remove();
};
exports.update = function (oauthToken) {
    oauthToken.update_at = new Date();
    return OauthTokenModel.findOneAndUpdate({_id: oauthToken._id}, oauthToken);
}