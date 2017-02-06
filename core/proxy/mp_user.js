const Model = require('../models').MpUser;
const BaseProxy = require('./base_proxy');

class MpUserProxy extends BaseProxy {

}
exports = module.exports = new MpUserProxy(Model);

