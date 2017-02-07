const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../common/logger');
const BaseModel = require("./base_model");

mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});
mongoose.plugin(BaseModel);

// models
require('./menu');
exports.Menu = mongoose.model('Menu');

require('./oauth');
exports.Oauth = mongoose.model('Oauth');

require('./oauth_token');
exports.OauthToken = mongoose.model('OauthToken');

require('./version_upgrade');
exports.VersionUpgrade = mongoose.model('VersionUpgrade');

require('./role');
exports.Role = mongoose.model('Role');

require('./organization');
exports.Organization = mongoose.model('Organization');

require('./user');
exports.User = mongoose.model('User');

require('./mp_user');
exports.MpUser = mongoose.model('MpUser');

require('./mp_account');
exports.MpAccount = mongoose.model('MpAccount');

require('./mp_password');
exports.MpPassword = mongoose.model('MpPassword');


require('./merchant');
exports.Merchant = mongoose.model('Merchant');


require('./merchant_user');
exports.MerchantUser = mongoose.model('MerchantUser');







