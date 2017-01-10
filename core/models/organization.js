const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    key: {type: String}, // 业务关联要使用key，不要使用_id,_id总是变化
    parent_key: {type: String},
    name: {type: String},
    description: {type: String},
    remark: {type: String},
});
OrganizationSchema.index({key: 1}, {unique: true});
OrganizationSchema.pre('save', function (next) {
    this.update_at = new Date();
    next();
});
mongoose.model('Organization', OrganizationSchema);
