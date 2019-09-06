import { GET_PRICELIST, PRICELIST_ERROR, CREATE_PRICELIST, SETUP_DASHBOARD, UPDATE_ARRIVAL, UPDATE_DEPARTURE, UPDATE_PRICELIST_DASHBOARD, UPDATE_ROOMING, UPDATE_PRICES, TOGGLE_TABLE } from "../actions/types"; 

const initialState = {
    data: null,
    loading: true,
    error: {},
    table: false,
    loaded: false,
    arrival: undefined,
    departure: undefined,
    priceList: "",
    priceLists: [],
    rooming: {ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, animal: 0, culla: 0, sing: 0},
    days: [], //[["a", [timestamp1, timestamp2, ...], [...]]]
    prices: [] //[["a", {...}], ["b", {...}]]
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRICELIST:
            return {
                ...state,
                data: payload,
                loading: false
            }
        case SETUP_DASHBOARD:
            return {
                ...payload
            }
        case UPDATE_ARRIVAL:
        case UPDATE_DEPARTURE:
        case UPDATE_PRICELIST_DASHBOARD:
            return {
                ...state,
                ...payload
            }
        case PRICELIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_ROOMING:
            return {
                ...state,
                rooming: payload
            }
        case UPDATE_PRICES:
            return {
                ...state,
                prices: payload
            }
        case TOGGLE_TABLE:
            return {
                ...state,
                table: payload
            }
        case CREATE_PRICELIST:
            return {
                ...state,
                data: payload,
                loading: false
            }
        default:
            return state;
    }
}