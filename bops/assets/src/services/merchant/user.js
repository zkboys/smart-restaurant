import * as request from '../request';

const ADD_USER_URL = '/merchant/users';

export function addAccount(params) {
    return request.post(ADD_USER_URL, params)
        .then(data => data);
}

