import {handleActions} from 'redux-actions';
import _ from 'lodash';
import * as types from '../../constants/actionTypes';

let initialState = {
    currentPage: 1,
    pageSize: 10,
    savingOrUpdatingMpUser: false,
    gettingMpUser: false,
    deletingMpUser: {},
    switchingLockMpUser: {},
    resettingMpUser: {},
    mpUsers: {
        results: [],
        totalCount: 0,
    },
};

export default handleActions({
    [types.ADD_MP_USER](state, action) {
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
        mpUsers.results.unshift(payload);
        return {
            ...state,
            savingOrUpdatingMpUser,
            mpUsers,
        };
    },
    [types.UPDATE_MP_USER](state, action) {
        const {meta = {}, error} = action;
        const {sequence = {}, params} = meta;
        const savingOrUpdatingMpUser = sequence.type === 'start';

        if (savingOrUpdatingMpUser || error) {
            return {
                ...state,
                savingOrUpdatingMpUser,
            };
        }

        const mpUsers = _.cloneDeep(state.mpUsers);

        mpUsers.results.forEach((u, i, array) => {
            if (u.id === params.id) {
                array[i] = {...u, ...params};
            }
        });

        return {
            ...state,
            savingOrUpdatingMpUser,
            mpUsers,
        };
    },
    [types.DELETE_MP_USER](state, action) {
        const {meta = {}, error} = action;
        const {sequence = {}} = meta;
        const loading = sequence.type === 'start';
        const {id} = meta.params;

        if (loading || error) {
            return {
                ...state,
                deletingMpUser: {...state.deletingMpUser, [id]: loading},
            };
        }

        const mpUsers = _.cloneDeep(state.mpUsers);
        mpUsers.results = mpUsers.results.filter(u => {
            return u.id !== id;
        });

        return {
            ...state,
            deletingMpUser: {...state.deletingMpUser, [id]: loading},
            mpUsers,
        };
    },
    [types.GET_MP_USERS_BY_PARAMS](state, action) {
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
    [types.TOGGLE_LOCK_MP_USER](state, action) {
        const {meta = {}, error, payload} = action;
        const {sequence = {}} = meta;
        const loading = sequence.type === 'start';
        const {id} = meta.params;

        if (loading || error) {
            return {
                ...state,
                switchingLockMpUser: {...state.switchingLockMpUser, [id]: loading},
            };
        }
        const mpUsers = _.cloneDeep(state.mpUsers);
        mpUsers.results.forEach(u => {
            if (u.id === payload.id) {
                u.is_locked = !payload.is_locked;
            }
        });
        return {
            ...state,
            mpUsers,
            switchingLockMpUser: {...state.switchingLockMpUser, [id]: loading},
        };
    },
}, initialState);
