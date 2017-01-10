const VersionUpgradeProxy = require('../proxy/version_upgrade');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;

exports.getVersionUpgradeByCodeAndType = async function (versionCode, appType) {
    const versionUpgrade = await VersionUpgradeProxy.getVersionUpgradeByCodeAndType(versionCode, appType);

    if (!versionUpgrade) {
        throw new ServiceError(message.versionUpgradeIsNotExisted);
    }

    return versionUpgrade;
};




















