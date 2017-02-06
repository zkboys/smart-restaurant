/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
const tools = require('../common/tools');

module.exports = function (schema) {
    schema.add({
        is_deleted: {type: Boolean, default: false},
        create_at: {type: Date, default: Date.now},
        update_at: {type: Date, default: Date.now},
    });

    schema.methods.create_at_ago = function () {
        return tools.formatDate(this.create_at, true);
    };

    schema.methods.update_at_ago = function () {
        return tools.formatDate(this.update_at, true);
    };

    schema.pre('save', function (next) {
        this.update_at = new Date();
        next();
    });

    // Duplicate the ID field.
    schema.virtual('id').get(function () {
        return this._id.toHexString();
    });

    // Ensure virtual fields are serialised.
    schema.set('toJSON', {
        virtuals: true
    });

    // Ensure virtual fields are serialised.
    schema.set('toObject', {
        virtuals: true
    });
};
