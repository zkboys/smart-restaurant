const _ = require('lodash');
const uuid = require('uuid');

const MpUserProxy = require('../proxy/mp_user');
const MpAccountProxy = require('../proxy/mp_account');
const MpPasswordProxy = require('../proxy/mp_password')

const tools = require('../common/tools');
const ServiceError = require('./service-error');
const message = require('../properties').errorMessages;

const trim = _.trim;

exports.add = async function (mpUser) {
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

    const initPass = account[0] + 123456;
    const existedAccount = await MpAccountProxy.getByAccount(account);

    if (existedAccount) {
        throw new ServiceError(message.mpAccountIsUsed);
    }

    const salt = uuid.v4();
    const initHashedPass = await tools.bhash(initPass + salt);

    const savedMpUser = await MpUserProxy.save({
        name: mpUser.name || mpUser.account,
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

    return savedMpUser;
}






















