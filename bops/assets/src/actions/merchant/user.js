import {createAction} from 'redux-actions';
import * as types from '../../constants/actionTypes';
import * as mpUserService from '../../services/merchant/user';

export const addMpUser = createAction(types.ADD_MP_USER,
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


export const updateMpUser = createAction(types.UPDATE_MP_USER,
    async(params) => await mpUserService.update(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '修改成功！',
        };
    }
);

export const getMpUsersByParams = createAction(types.GET_MP_USERS_BY_PARAMS,
    async(params) => await mpUserService.getByParams(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
        };
    }
);
