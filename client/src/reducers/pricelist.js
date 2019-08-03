import { GET_PRICELIST, PRICELIST_ERROR, CREATE_PRICELIST, CHANGE_PRICELIST_NAME } from "../actions/types";

const initialState = {
    pricelist: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRICELIST:
            return {
                ...state,
                pricelist: payload,
                loading: false
            }
        case PRICELIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CREATE_PRICELIST:
            return {
                ...state,
                pricelist: payload,
                loading: false
            }
        case CHANGE_PRICELIST_NAME:
            return {
                ...state,
                pricelist: payload,
                loading: false
            }
        default:
            return state;
    }
}