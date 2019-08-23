import { GET_PRICELIST, PRICELIST_ERROR, CREATE_PRICELIST, CHANGE_PRICELIST_NAME, SETUP_ADMINUPDATE, UPDATE_PRICELIST_STATE, UPDATE_NEWPERIODDATA_STATE, TOGGLE_NEWPERIODFORM, DATA_UPDATEHANDLER, SYNC_NEWNAME } from "../actions/types"; 

const initialState = {
    data: null,
    loading: true,
    error: {},
    loaded: false,
    newPeriod: false,
    newPeriodData: {periodName: "", start: "", end: "", ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, culla: 10, animal: 5, sing: 14},
    priceList: "",
    newPricelistName: "",
    priceListId: "",
    priceLists: [],
    periods: []
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
        case SETUP_ADMINUPDATE:
            return {
                ...payload
            }
        case UPDATE_PRICELIST_STATE:
            return {
                ...state,
                priceList: payload.priceList,
                priceListId: payload.priceListId,
                periods: payload.periods
            }
        case UPDATE_NEWPERIODDATA_STATE:
            return {
                ...state,
                newPeriodData: { ...state.newPeriodData, [payload.dataName]: payload.dataValue }
            }
        case TOGGLE_NEWPERIODFORM:
            return {
                ...state,
                newPeriod: !state.newPeriod
            }
        case DATA_UPDATEHANDLER:
            return {
                ...state,
                data: payload
            }
        case SYNC_NEWNAME:
            return {
                ...state,
                newPricelistName: payload
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
                data: payload,
                loading: false
            }
        case CHANGE_PRICELIST_NAME:
            return {
                ...state,
                data: payload,
                loading: false
            }
        default:
            return state;
    }
}