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

//Create a new pricelist
export const createPricelist = (newPricelist, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const body = JSON.stringify({"priceList": newPricelist});

        const res = await axios.post('/api/pricelist/create', body, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

        dispatch(setAlert('Pricelist created'));

        history.push('/admin');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add or update a period to an existing pricelist
export const addPeriod = (newPeriod, pricelistId, periodId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let url = `api/pricelist/${pricelistId}/period`;

        if (periodId) {
            newPeriod.periodId = periodId;
        }
    
        const body = JSON.stringify(newPeriod);

        const res = await axios.post(url, body, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

        dispatch(setAlert(periodId ? 'Period updated' : 'New Period added'));
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Delete a period from a pricelist
export const deletePeriod = (periodId, pricelistId) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const url = `api/pricelist/${pricelistId}/period/delete/${periodId}`;

        const res = await axios.post(url, null, config);

        dispatch({
            type: CREATE_PRICELIST,
            payload: res.data
        });

        dispatch(getCurrentPricelist());
    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}