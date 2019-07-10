import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PRICELIST,
    PRICELIST_ERROR,
    CREATE_PRICELIST
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

export const createPricelist = (newPricelist) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({"priceList": newPricelist});
        console.log(body);

        const res = await axios.post('/api/pricelist/create', body, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const addPeriod = (newPeriod, pricelistId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = `api/pricelist/${pricelistId}/period/add`;
    
        const body = JSON.stringify(newPeriod);
        //console.log(body);

        const res = await axios.post(url, body, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const deletePeriod = (periodId, pricelistId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = `api/pricelist/${pricelistId}/period/delete/${periodId}`;
    
        //const body = JSON.stringify(newPeriod);
        //console.log(body);

        const res = await axios.post(url, null, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}