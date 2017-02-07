import * as request from '../request';

const MCH_URL = '/merchant/mchs';

export function add(params) {
    return request.post(MCH_URL, params)
        .then(data => data);
}

export function update(params) {
    return request.put(MCH_URL, params)
        .then(data => data);
}

export function del(params) {
    return request.del(MCH_URL, params)
        .then(data => data);
}



