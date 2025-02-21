// Action Types
export const SET_USER = 'auth/setUser';
export const LOGOUT = 'auth/logout';

// Action Creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const logout = () => ({
    type: LOGOUT
});

const initialState = {
    user: null,
    isAuthenticated: false,
};

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

export default authReducer;
