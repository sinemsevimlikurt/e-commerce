import api from '../../services/api';

// Action Types
export const FETCH_PRODUCTS_START = 'product/fetchProductsStart';
export const FETCH_PRODUCTS_SUCCESS = 'product/fetchProductsSuccess';
export const FETCH_PRODUCTS_ERROR = 'product/fetchProductsError';

// Action Creators
export const fetchProductsStart = () => ({
    type: FETCH_PRODUCTS_START
});

export const fetchProductsSuccess = (data) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data
});

export const fetchProductsError = (error) => ({
    type: FETCH_PRODUCTS_ERROR,
    payload: error
});

// Thunk Action Creator
export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());
        const response = await api.products.getAll(queryString);
        dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
        dispatch(fetchProductsError(error.message));
    }
};

// Initial State
const initialState = {
    products: [],
    total: 0,
    loading: false,
    error: null
};

// Reducer
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                total: action.payload.total,
                error: null
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default productReducer;
