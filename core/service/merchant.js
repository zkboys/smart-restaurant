const _ = require('lodash');
const MerchantProxy = require('../proxy/merchant');
const MerchantUserProxy = require('../proxy/merchant-user');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;
const validator = require('../common/validator');
const trim = _.trim;

exports.getByUserId = async function (userId) {
    const mchUsers = await MerchantUserProxy.getByUserId(userId);
    if (!mchUsers) return [];

    const mchIds = mchUsers.map(mu => mu.mch_id);

    return await MerchantProxy.getByIds(mchIds);
};


exports.getByOwnerId = async function (ownerId) {
    return await MerchantProxy.getByOwnerId(ownerId);
};


exports.add = async function (merchant) {
    const name = trim(merchant.name);
    const mobile = merchant.mobile;
    const owner_id = merchant.owner_id;

    if (!name) {
        throw new ServiceError(message.merchantNameCanNotBeNull);
    }

    if (!mobile) {
        throw new ServiceError(message.mobileCanNotBeNull);
    }

    if (!validator.isMobile(mobile)) {
        throw new ServiceError(message.mobileInvalid);
    }
    const savedMerchant = await MerchantProxy.save(merchant);
    const mchId = savedMerchant.id;
    await MerchantUserProxy.save({
        mch_id: mchId,
        user_id: owner_id,
    });

    return savedMerchant;
}