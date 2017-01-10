const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    app_key: String,
    app_secret: String,
    scope: {type: String},
    expires_in: Number, // 过期时间，单位秒
});

mongoose.model('Oauth', RoleSchema);
