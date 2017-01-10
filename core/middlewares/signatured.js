const config = require('../config');
const AppService = require('../service/app');

exports = module.exports = function (authenticated = false) {
    return async function (req, res, next) {
        const appKey = req.headers.appkey;
        const timestamp = req.headers.timestamp;
        const ticket = req.headers.ticket;
        const sign = req.headers.sign;
        let version = req.headers.version;
        const accessToken = req.headers.accesstoken;
        const url = req.url;
        const method = req.method;
        let params = req.body;
        if (method === 'GET') {
            params = req.query;
        }

        try {
            await AppService.checkSignature({
                url,
                sign,
                ticket,
                appKey,
                params,
                version,
                timestamp,
                accessToken,
                authenticated
            });
            next();
        } catch (error) {
            res.sendError(error);
        }

    }
}