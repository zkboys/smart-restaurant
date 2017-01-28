const Model = require('../models').MpPassword;
const BaseProxy = require('./base_proxy');

class MpPasswordProxy extends BaseProxy {

}

exports = module.exports = new MpPasswordProxy(Model);

