const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    oauth_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,
    app_key: String,
    scope: String,
    version_id: Schema.Types.ObjectId,
    access_token: String,
    expired_at: Number,
    refresh_token: String,
    old_refresh_token: String,
    refresh_token_expired_at: Number,
});

mongoose.model('OauthToken', RoleSchema);
