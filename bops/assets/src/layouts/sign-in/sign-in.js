import './sign-in.css';
import * as Storage from '../../utils/storage';
import * as requestService from '../../services/request';

let isFirstLogin = false;
const loginButton = document.getElementById('login-btn');
const resetPassButton = document.getElementById('reset-pass-btn');
const nameEle = document.getElementById('name');
const passEle = document.getElementById('pass');
const newPassEle = document.getElementById('new-pass');
const reNewPassEle = document.getElementById('re-new-pass');
const csrfMeta = document.querySelector('meta[name="csrf-token"]');
let _csrf = csrfMeta ? csrfMeta.getAttribute('content') : '';

function showLoading() {
    if (isFirstLogin) {
        const resetPassLoading = '确认中。。。';
        resetPassButton.innerHTML = resetPassLoading;
        resetPassButton.innerText = resetPassLoading;
    } else {
        const loginLoading = '登录中。。。';
        loginButton.innerHTML = loginLoading;
        loginButton.innerText = loginLoading;
    }
}

function hideLoading() {
    if (isFirstLogin) {
        const resetPassButtonText = '确认';
        resetPassButton.innerHTML = resetPassButtonText;
        resetPassButton.innerText = resetPassButtonText;
    } else {
        const loginButtonText = '登录';
        loginButton.innerHTML = loginButtonText;
        loginButton.innerText = loginButtonText;
    }
}

function showFirstLogin() {
    const firstLoginEle = document.getElementById('first-login-box');
    const loginEle = document.getElementById('login-box');
    loginEle.style.display = 'none';
    firstLoginEle.style.display = 'block';
    isFirstLogin = true;
}

function showError(error = '未知系统错误') {
    if (isFirstLogin) {
        const resetPassErrorEle = document.getElementById('reset-pass-error');
        resetPassErrorEle.innerHTML = error;
        resetPassErrorEle.innerText = error;// ie?
    } else {
        const loginErrorEle = document.getElementById('login-error');
        loginErrorEle.innerHTML = error;
        loginErrorEle.innerText = error;// ie?
    }
}

function clearError() {
    const loginErrorEle = document.getElementById('login-error');
    const resetPassErrorEle = document.getElementById('reset-pass-error');
    loginErrorEle.innerHTML = '';
    loginErrorEle.innerText = '';// ie?
    resetPassErrorEle.innerHTML = '';
    resetPassErrorEle.innerText = '';// ie?
}

function handleLogin() {
    clearError();
    const name = nameEle.value;
    const pass = passEle.value;
    if (!name) {
        showError('请输入用户名');
        return;
    }
    if (!pass) {
        showError('请输入密码');
        return;
    }
    const params = {
        _csrf,
        name,
        pass,
    };
    showLoading();
    requestService.post('/signin', params)
        .then((res) => {
            const currentLoginUser = res.user;
            if (currentLoginUser.is_first_login) {
                hideLoading();
                showFirstLogin();
                return false;
            }

            const refer = res.refer || '/';
            const menus = res.menus || [];

            Storage.session.setItem('currentLoginUser', currentLoginUser);
            Storage.session.setItem('menus', menus);
            location.href = refer;
        })
        .catch((err) => {
            if (err && err.body) {
                showError(err.body.message || (err.body.error && err.body.error.message));
            } else {
                showError();
            }
            // 出错清除loading状态，成功之后不清除状态，等待跳转。
            hideLoading();
        });
}

function handleResetPass() {
    clearError();
    const newPass = newPassEle.value;
    const reNewPass = reNewPassEle.value;
    if (!newPass) {
        showError('请输入新密码');
        return;
    }
    if (!reNewPass) {
        showError('请输入确认新密码');
        return;
    }
    if (newPass !== reNewPass) {
        showError('两次输入密码不一致');
        return;
    }
    const params = {
        _csrf,
        pass: newPass,
        rePass: reNewPass,
    };
    showLoading();
    requestService.put('/first_login', params)
        .then((res) => {
            const refer = res.refer || '/';
            const menus = res.menus || [];
            const currentLoginUser = res.user;
            Storage.session.setItem('currentLoginUser', currentLoginUser);
            Storage.session.setItem('menus', menus);
            location.href = refer;
        })
        .catch((err) => {
            if (err && err.body) {
                showError(err.body.message || (err.body.error && err.body.error.message));
            } else {
                showError();
            }
            // 出错清除loading状态，成功之后不清除状态，等待跳转。
            hideLoading();
        });
}

function handleKeyDown(e) {
    if (e.keyCode === 13) {
        if (isFirstLogin) {
            handleResetPass();
        } else {
            handleLogin();
        }
    }
}

function addHandler(element, type, handler) {
    if (!element) return;
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent(`on${type}`, handler);
    } else {
        element[`on${type}`] = handler;
    }
}

addHandler(loginButton, 'click', handleLogin);
addHandler(resetPassButton, 'click', handleResetPass);
addHandler(nameEle, 'keydown', handleKeyDown);
addHandler(passEle, 'keydown', handleKeyDown);
addHandler(newPassEle, 'keydown', handleKeyDown);
addHandler(newPassEle, 'keydown', handleKeyDown);
