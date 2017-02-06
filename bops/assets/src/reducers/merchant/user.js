import {handleActions} from 'redux-actions';
import _ from 'lodash';
import {ADD_MP_USER} from '../../constants/actionTypes';

let initialState = {
    currentPage: 1,
    pageSize: 10,
    savingOrUpdating: false,
    getting: false,
    deleting: {},
    resetting: {},
    accounts: {
        results: [],
        totalCount: 0,
    },
};

export default handleActions({
    [ADD_MP_USER](state, action) {
        const {meta = {}, error, payload} = action;
        const {sequence = {}} = meta;
        const savingOrUpdating = sequence.type === 'start';

        if (savingOrUpdating || error) {
            return {
                ...state,
                savingOrUpdating,
            };
        }

        const accounts = _.cloneDeep(state.accounts);
        accounts.results.unshift(payload);

        return {
            ...state,
            savingOrUpdating,
            accounts,
        };
    },
}, initialState);
