const logger = require('../common/logger');

// Patch res.render method to output logger
exports = module.exports = function (req, res, next) {
    res._render = res.render;

    res.render = function (view, options, fn) {
        const t = new Date();

        res._render(view, options, fn);

        const duration = (new Date() - t);
        logger.info("Render view", view, ("(" + duration + "ms)").green);
    };

    next();
};
