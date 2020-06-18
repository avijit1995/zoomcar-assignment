import {
    GET_DATA_SUCCESS
} from './action-types.js';

// The initial application state
const initialState = {
    data: []
};

// Change the state based on the action
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_SUCCESS:
            return Object.assign({}, state, { data: action.data });
        default:
            return state;
    }
};

export default appReducer;