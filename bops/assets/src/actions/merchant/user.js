import {createAction} from 'redux-actions';
import {ADD_MP_USER, GET_MP_USERS_BY_PARAMS} from '../../constants/actionTypes';
import * as mpUserService from '../../services/merchant/user';

export const addMpUser = createAction(ADD_MP_USER,
    async(params) => await mpUserService.add(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '添加成功！',
        };
    }
);

export const getMpUsersByParams = createAction(GET_MP_USERS_BY_PARAMS,
    async(params) => await mpUserService.getByParams(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
        };
    }
);
