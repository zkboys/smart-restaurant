const _ = require('lodash');
const StoreProxy = require('../proxy/store');
const StoreUserProxy = require('../proxy/store_user');
const MerchantProxy = require('../proxy/merchant');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;
const validator = require('../common/validator');
const trim = _.trim;

exports.getByMchId = async function (mchId) {
    return await StoreProxy.getByMchId(mchId);
};

exports.getByMchIdAndUserId = async function (mchId, userId) {
    const storeUsers = await StoreUserProxy.getByMchIdAndUserId(mchId, userId);
    if (storeUsers) {
        const storeIds = storeUsers.map(s => s.store_id);
        return await StoreProxy.getByIds(storeIds);
    }
    return [];
};

exports.add = async function (store) {

    validateStore(store);

    const mch_id = trim(store.mch_id);
    const savedStore = await StoreProxy.save(store);

    const storeId = savedStore.id;
    const merchant = await MerchantProxy.getById(mch_id);
    const userId = merchant.owner_id;
    await StoreUserProxy.save({
        mch_id: mch_id,
        store_id: storeId,
        user_id: userId,
    });

    return savedStore;
};

exports.delete = async function (storeId) {
    await StoreUserProxy.deleteByStoreId(storeId);
    return await StoreProxy.deleteById(storeId);
};

exports.update = async function (store) {
    validateStore(store);
    return await StoreProxy.update(store);
}

function validateStore(store) {
    const mch_id = trim(store.mch_id);
    const name = trim(store.name);
    const logo = trim(store.logo);
    const type = trim(store.type);
    const province = trim(store.province);
    const city = trim(store.city);
    const district = trim(store.district);
    const address = trim(store.address);
    const mobile = trim(store.mobile);
    const tel = trim(store.tel);
    const lng = trim(store.lng);
    const lat = trim(store.lat);
    const state = trim(store.state);
    const expired_at = trim(store.expired_at);
    const remark = trim(store.remark);
    const creator_id = trim(store.creator_id);

    if (!name) {
        throw new ServiceError(message.storeNameCanNotBeNull);
    }

    if (!mobile) {
        throw new ServiceError(message.mobileCanNotBeNull);
    }

    if (!validator.isMobile(mobile)) {
        throw new ServiceError(message.mobileInvalid);
    }

    // TODO 完善校验
}
