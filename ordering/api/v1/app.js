const controllerDecorator = require('../../../core/common/controller-decorator');

const versionUpgradeService = require('../../../core/service/version_upgrade');

exports.checkVersion = controllerDecorator(async function (req, res) {
    const appType = req.query.appType;
    const clientVersion = req.query.clientVersion;

    const versionUpgrade = await versionUpgradeService.getVersionUpgradeByCodeAndType(clientVersion, appType);

    res.send({
        versionCode: versionUpgrade.version_code, // 版本号
        versionName: versionUpgrade.version_name, // 版本名
        promote: versionUpgrade.promote, // 是否更新 0:不更新 1:更新 2:强制更新
        appUrl: versionUpgrade.app_url, // 更新下载地址
        upgradePrompt: versionUpgrade.upgrade_prompt // 更新提示
    });
});