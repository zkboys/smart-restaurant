import * as request from '../request';

const ADD_USER_URL = '/merchant/users';

export function add(params) {
    return request.post(ADD_USER_URL, params)
        .then(data => data);
}

export function getByParams(params) {
    return request.get('/merchant/users', params)
        .then(data => data);
}


