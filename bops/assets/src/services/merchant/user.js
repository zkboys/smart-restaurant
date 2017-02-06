import * as request from '../request';

const ADD_ACCOUNT_URL = '/merchant/accounts';

export function addAccount(params) {
    return request.post(ADD_ACCOUNT_URL, params)
        .then(data => data);
}

