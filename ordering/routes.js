const router = require('express').Router();
const oauth = require('./api/v1/oauth');
const app = require('./api/v1/app');
const user = require('./api/v1/user');

const table = require('./api/v1/table');

const merchant = require('./api/v1/merchant');

const dish = require('./api/v1/dish');

const signatured = require('../core/middlewares/signatured');
const authenticated = require('../core/middlewares/authenticated');

const requireAuthenticated = true;

router.get('/v1/oauth/sign_in.json', signatured(), oauth.signIn);
router.get('/v1/version.json', app.checkVersion);
router.get('/v1/user.json', authenticated, signatured(requireAuthenticated), user.getUserById);
router.get('/v1/users.json', authenticated, signatured(requireAuthenticated), user.getAllUsers);
router.get('/v1/current_user.json', authenticated, signatured(requireAuthenticated), user.getCurrentLoginUser);

router.get('/v1/oauth/refresh_token.json', signatured(), oauth.refreshToken);
router.get('/v1/table_regions.json', authenticated, signatured(requireAuthenticated), table.getTableRegions);
router.put('/v1/clean_table.json', authenticated, signatured(requireAuthenticated), table.cleanTable);

router.get('/v1/merchants.json', authenticated, signatured(requireAuthenticated), merchant.getMerchants);


router.get('/v1/dishes.json', authenticated, signatured(requireAuthenticated), dish.getAllDishes);


module.exports = router;