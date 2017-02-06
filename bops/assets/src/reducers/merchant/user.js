import {handleActions} from 'redux-actions';
import _ from 'lodash';
import {ADD_MP_USER, GET_MP_USERS_BY_PARAMS} from '../../constants/actionTypes';

let initialState = {
    currentPage: 1,
    pageSize: 10,
    savingOrUpdatingMpUser: false,
    gettingMpUser: false,
    deletingMpUser: {},
    resettingMpUser: {},
    mpUsers: {
        results: [],
        totalCount: 0,
    },
};

export default handleActions({
    [ADD_MP_USER](state, action) {
        const {meta = {}, error, payload} = action;
        const {sequence = {}} = meta;
        const savingOrUpdatingMpUser = sequence.type === 'start';

        if (savingOrUpdatingMpUser || error) {
            return {
                ...state,
                savingOrUpdatingMpUser,
            };
        }

        const mpUsers = _.cloneDeep(state.mpUsers);
        console.log(payload);
        mpUsers.results.unshift(payload);

        return {
            ...state,
            savingOrUpdatingMpUser,
            mpUsers,
        };
    },
    [GET_MP_USERS_BY_PARAMS](state, action) {
        const {meta = {}, error, payload} = action;
        const {sequence = {}, params} = meta;
        const gettingMpUser = sequence.type === 'start';
        if (gettingMpUser || error) {
            return {
                ...state,
                gettingMpUser,
            };
        }
        return {
            ...state,
            mpUsers: payload,
            gettingMpUser,
            currentPage: params.currentPage,
            pageSize: params.pageSize,
        };
    },
}, initialState);
