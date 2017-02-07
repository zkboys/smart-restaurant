import * as request from '../request';

const MERCHANT_USER_URL = '/merchant/users';

export function add(params) {
    return request.post(MERCHANT_USER_URL, params)
        .then(data => data);
}

export function update(params) {
    return request.put(MERCHANT_USER_URL, params)
        .then(data => data);
}

export function getByParams(params) {
    return request.get(MERCHANT_USER_URL, params)
        .then(data => data);
}


