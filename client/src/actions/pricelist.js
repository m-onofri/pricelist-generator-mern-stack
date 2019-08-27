import axios from 'axios';
//import { setAlert } from './alert';
import { manageDays, selectPrices } from '../utils/dateUtilities';

import {
    GET_PRICELIST,
    PRICELIST_ERROR,
    SETUP_DASHBOARD,
    UPDATE_ARRIVAL,
    UPDATE_DEPARTURE,
    UPDATE_PRICELIST_DASHBOARD,
    UPDATE_ROOMING,
    UPDATE_PRICES,
    TOGGLE_TABLE
} from './types';

//Get current users pricelist
export const getCurrentPricelist = () => async dispatch => {
    try {
        const res = await axios.get('/api/pricelist');

        dispatch({
            type: GET_PRICELIST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get current users pricelist
export const setupDashboard= () => async dispatch => {
    try {
        const res = await axios.get('/api/pricelist');
        const data = res.data;
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        const todayTimestamp = today.getTime();
        const tomorrowTimestamp = todayTimestamp + 86400000;
        const priceLists = Object.keys(data);
        const priceList = priceLists[0];
        const selectedDays = manageDays(todayTimestamp, tomorrowTimestamp, data[priceList]);
        const prices = selectPrices(selectedDays, priceList, data);
        const updatedState = {
            loading: false,
            error: {},
            table: false,
            rooming: {ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, animal: 0, culla: 0, sing: 0},
            data,
            loaded: true,
            arrival: todayTimestamp,
            departure: tomorrowTimestamp,
            days: selectedDays,
            priceList,
            priceLists,
            prices
        }

        dispatch({
            type: SETUP_DASHBOARD,
            payload: updatedState
        });
    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get current users pricelist
export const updateArrivalState = (obj) => dispatch => {

    dispatch({
        type: UPDATE_ARRIVAL,
        payload: obj
    });
};

//Get current users pricelist
export const updateDepartureState = (obj) => dispatch => {

    dispatch({
        type: UPDATE_DEPARTURE,
        payload: obj
    });
};

//Get current users pricelist
export const updatePriceListState = (obj) => dispatch => {

    dispatch({
        type: UPDATE_PRICELIST_DASHBOARD,
        payload: obj
    });
};

//Get current users pricelist
export const updateRoomingState = rooming => dispatch => {

    dispatch({
        type: UPDATE_ROOMING,
        payload: rooming
    });
};

//Get current users pricelist
export const updatePricesState = prices => dispatch => {

    dispatch({
        type: UPDATE_PRICES,
        payload: prices
    });
};

//Get current users pricelist
export const toggleTableState = table => dispatch => {

    dispatch({
        type: TOGGLE_TABLE,
        payload: table
    });
};