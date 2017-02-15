const _ = require('lodash');
const uuid = require('uuid');

const MpUserProxy = require('../proxy/mp_user');
const MpAccountProxy = require('../proxy/mp_account');
const MpPasswordProxy = require('../proxy/mp_password');

const MerchantService = require('./merchant');

const tools = require('../common/tools');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;

const trim = _.trim;

exports.getAccountByAccount = async function (account) {
    return await MpAccountProxy.getByAccount(account);
}


exports.getByPage = async function (currentPage = 1, pageSize = 10, queries = []) {
    const accounts = await MpAccountProxy.getByPage(currentPage, pageSize, queries);
    const totalCount = await MpAccountProxy.getCountByQuery(queries);
    if (!accounts) {
        return {
            results: [],
            totalCount: 0,
        }
    }

    const userIds = accounts.map(acc => acc.user_id);
    const users = await MpUserProxy.getByIds(userIds);
    const results = [];

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        const user = users.find(u => u.id == account.user_id);
        const merchants = await MerchantService.getByOwnerId(user.id);
        results.push(
            {
                id: user.id,
                account: account.account,
                name: user.name,
                is_locked: user.is_locked,
                is_admin: user.is_admin,
                merchants,
            }
        );
    }
    return {results, totalCount}
};

exports.deleteById = async function (userId) {
    // FIXME: 多账号，这里将会是个问题，这里只删除了一个账号
    await MpAccountProxy.deleteByMpUserId(userId);
    return await MpUserProxy.deleteById(userId);
};


exports.toggleLock = async function (userId, isLocked) {
    if (isLocked) {
        return await MpUserProxy.unlock(userId);
    }
    return await MpUserProxy.lock(userId);
};

exports.update = async function (mpUser) {
    validateMpUser(mpUser);
    return await MpUserProxy.update(mpUser);
};

exports.add = async function (mpUser) {
    const account = trim(mpUser.account);

    validateMpUser(mpUser);

    const initPass = account[0] + 123456;
    const existedAccount = await MpAccountProxy.getByAccount(account);

    if (existedAccount) {
        throw new ServiceError(message.mpAccountIsUsed);
    }

    const salt = uuid.v4();
    const initHashedPass = await tools.bhash(initPass + salt);

    const savedMpUser = await MpUserProxy.save({
        name: mpUser.name || mpUser.account,
        is_admin: mpUser.is_admin || false,
        is_locked: mpUser.is_locked || false,
    });

    const mpUserId = savedMpUser._id;

    const savedMpAccount = await MpAccountProxy.save({
        user_id: mpUserId,
        account: mpUser.account,
        type: 'email', // TODO: mobile email
    });

    const mpAccountId = savedMpAccount._id;

    const savedMpPassword = await MpPasswordProxy.save({
        account_id: mpAccountId,
        password: initHashedPass,
        salt: salt,
    });
    savedMpUser.account = savedMpAccount.account;

    return {
        id: savedMpUser.id,
        name: savedMpUser.name,
        account: savedMpAccount.account,
        is_locked: savedMpUser.is_locked,
        is_admin: savedMpUser.is_admin,
        mchCount: 0,
    };
}

function validateMpUser(mpUser) {
    const account = trim(mpUser.account);

    if (!account) {
        throw new ServiceError(message.mpAccountCanNotBeNull);
    }

    if (account.length < 2) {
        throw new ServiceError(message.mpAccountLengthInvalid);
    }

    if (!tools.validateId(account)) {
        throw new ServiceError(message.mpAccountInvalid);
    }
}





















