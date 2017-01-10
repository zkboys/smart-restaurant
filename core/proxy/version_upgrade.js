const VersionUpgradeModel = require('../models').VersionUpgrade;

exports.getVersionUpgradeByCodeAndType = function (versionCode, appType) {
    return VersionUpgradeModel.findOne({version_code: versionCode, app_type: appType}).lean().lean();
}

exports.addVersionUpgrade = function (versionUpgrade) {
    return new VersionUpgradeModel(versionUpgrade).save();
};