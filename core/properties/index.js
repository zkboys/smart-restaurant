exports.errorMessages = {
    loginNameCanNotBeNull: [1000, '用户名不能为空'],
    loginNameLengthInvalid: [1001, '登录名至少需要2个字符'],
    loginNameInvalid: [1002, '登录名不合法'],
    loginNameIsUsed: [1003, '登录名已被使用'],

    mpNameCanNotBeNull: [1004, '用户名不能为空'],
    mpAccountCanNotBeNull: [1005, '账号不能为空'],
    mpNameInvalid: [1006, '用户名不合法'],
    mpAccountInvalid: [1007, '账号不合法'],
    mpAccountLengthInvalid: [1008, '账号至少需要2个字符'],
    mpAccountIsUsed: [1009, '账号名已被占用'],
    mpAccountIsNotExisted: [1010, '账号不存在'],

    passCanNotBeNull: [2000, '密码不能为空'],
    passInvalid: [2001, '密码不可用'],
    oldPassCanNotBeNull: [2002, '原密码不能为空'],
    oldPassInvalid: [2003, '原密码错误'],
    newPassCanNotBeNull: [2004, '新密码不能为空'],
    newPassRepeatCanNotBeNull: [2005, '重复新密码不能为空'],
    towPassIsDifferent: [2006, '两次输入密码不一致'],

    loginNamePassCanNotBeNull: [3000, '用户名密码不能为空'],
    loginNamePassInvalid: [3001, '用户名或者密码错误'],
    userIsLocked: [3004, '您已经被管理员屏蔽，如有疑问，请与管理员联系'],
    // 客户端会用到这几个code，判断是否需要重新登录、重新获取token等操作。
    userIsNotExisted: [3005, '用户不存在'],
    userIsInvalid: [3006, '用户不合法'],
    accessTokenInvalid: [3007, '无效的accessToken'],
    accessTokenExpired: [3008, 'accessToken已过期'],
    refreshTokenInvalid: [3009, '无效的refreshToken'],
    refreshTokenExpired: [3010, 'refreshToken已过期'],

    roleNameCanNotBeNull: [4000, '角色名不能为空'],

    versionUpgradeIsNotExisted: [5000, '版本信息不存在'],

    oauthIsNotExisted: [6000, '无效的客户端'],
    scopeInvalid: [6001, '用户授权拒绝'],
    ticketInvalid: [6002, '无效的ticket'],
    versionInvalid: [6002, '无效的版本号'],
    timestampInvalid: [6003, '无效的timestamp'],
    signInvalid: [6004, '无效的签名'],


}