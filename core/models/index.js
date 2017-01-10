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
require('./role');
require('./organization');

require('./user');
require('./oauth');
require('./oauth_token');
require('./version_upgrade');


exports.Menu = mongoose.model('Menu');
exports.Role = mongoose.model('Role');
exports.Organization = mongoose.model('Organization');

exports.User = mongoose.model('User');
exports.Oauth = mongoose.model('Oauth');
exports.OauthToken = mongoose.model('OauthToken');
exports.VersionUpgrade = mongoose.model('VersionUpgrade');
