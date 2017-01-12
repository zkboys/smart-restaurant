const router = require('express').Router();
const oauth = require('./api/v1/oauth');
const app = require('./api/v1/app');
const user = require('./api/v1/user');
const signatured = require('../core/middlewares/signatured');
const authenticated = require('../core/middlewares/authenticated');

const requireAuthenticated = true;

router.get('/v1/oauth/sign_in.json', signatured(), oauth.signIn);
router.get('/v1/version.json', app.checkVersion);
router.get('/v1/user.json', authenticated, signatured(requireAuthenticated), user.getUserById);
router.get('/v1/users.json', authenticated, signatured(requireAuthenticated), user.getAllUsers);
router.get('/v1/oauth/refresh_token.json', signatured(), oauth.refreshToken);

module.exports = router;