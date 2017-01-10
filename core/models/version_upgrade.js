const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    app_type: String, // 客户端设备类型(android,ios)
    version_name: String, // 可读性版本号，给用户看的 '1.0.5'
    version_code: Number, // 版本号，程序使用 6
    promote: Number, // 是否更新 0:不更新 1:更新 2:强制更新
    app_url: String, // 新app下载地址
    upgrade_prompt: String, // app更新内容
    size: Number, // app大小
    state: String, //
});

mongoose.model('VersionUpgrade', RoleSchema);
