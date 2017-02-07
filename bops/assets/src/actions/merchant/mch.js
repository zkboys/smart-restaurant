import {createAction} from 'redux-actions';
import * as types from '../../constants/actionTypes';
import * as mchService from '../../services/merchant/mch';

export const addMch = createAction(types.ADD_MCH,
    async(params) => await mchService.add(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '添加成功！',
        };
    }
);


export const updateMch = createAction(types.UPDATE_MCH,
    async(params) => await mchService.update(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '修改成功！',
        };
    }
);


export const deleteMch = createAction(types.DELETE_MCH,
    async(params) => await mchService.del(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '删除成功！',
        };
    }
);
