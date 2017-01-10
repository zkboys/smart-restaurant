const bcrypt = require('bcryptjs');
const moment = require('moment');
const crypto = require('crypto');
moment.locale('zh-cn'); // 使用中文


exports.validateId = function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.bhash = function (str) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(str, 10, (error, passhash) => {
            if (error) {
                reject(error);
            } else {
                resolve(passhash);
            }
        });
    });
};


exports.bcompare = function (str, hash) {

    return new Promise((resolve, reject) => {
        bcrypt.compare(str, hash, (error, bool) => {
            if (error) {
                reject(error);
            } else {
                resolve(bool);
            }
        });
    });
};

exports.md5 = function (str) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

