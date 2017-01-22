const OrganizationService = require('../../core/service/organization');
const controllerDecorator = require('./../../core/common/controller-decorator');

exports.getAll = controllerDecorator(async function (req, res, next) {
    const organizations = await OrganizationService.getAllOrganizations();
    res.send(organizations);
});

exports.updateAll = controllerDecorator(async function (req, res, next) {
    const organizations = req.body.organizations;
    await OrganizationService.updateAllOrganizations(organizations);
    res.sendSuccess();
});
