const Model = require('../models').MpAccount;
const BaseProxy = require('./base_proxy');

class MpAccountProxy extends BaseProxy {

}

exports = module.exports = new MpAccountProxy(Model);

