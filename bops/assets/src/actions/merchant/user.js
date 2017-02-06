import {createAction} from 'redux-actions';
import {ADD_MP_USER} from '../../constants/actionTypes';
import * as accountService from '../../services/merchant/user';

export const addMpUser = createAction(ADD_MP_USER,
    async(params) => await accountService.addAccount(params),
    (params, resolved, rejected) => {
        return {
            params,
            resolved,
            rejected,
            autoTipSuccess: '添加成功！',
        };
    }
);

