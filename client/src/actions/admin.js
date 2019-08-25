import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PRICELIST,
    PRICELIST_ERROR,
    CREATE_PRICELIST,
    SETUP_ADMINUPDATE,
    UPDATE_PRICELIST_STATE,
    UPDATE_NEWPERIODDATA_STATE,
    TOGGLE_NEWPERIODFORM,
    DATA_UPDATEHANDLER,
    SYNC_NEWNAME,
    UPDATE_PERIOD
} from './types';

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
export const setupAdminUpdatePage= () => async dispatch => {
    try {
        const res = await axios.get('/api/pricelist');
        const data = res.data;
        const priceLists = Object.keys(data);
        const priceList = priceLists[0];
        const priceListId = data[priceList].id;
        const periods = Object.keys(data[priceList]).filter(x => x !== 'id');
        const updatedState = {
            loaded: true,
            data,
            priceLists,
            newPricelistName: "New Pricelist Name",
            newPeriod: false,
            priceList,
            priceListId,
            periods,
            loading: true,
            error: {},
            newPeriodData: {periodName: "", start: "", end: "", ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, culla: 10, animal: 5, sing: 14}
        }

        dispatch({
            type: SETUP_ADMINUPDATE,
            payload: updatedState
        });
    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Update pricelist in the state
export const updatePriceListState = (event, data) => dispatch => {

    const priceList = event.target.value;
    const periods = Object.keys(data[priceList]);
    const priceListId = data[priceList].id;

    dispatch({
        type: UPDATE_PRICELIST_STATE,
        payload: {priceList, periods, priceListId}
    });

};

//Update newPeriod in the state
export const updateNewPeriodDataState = (event) => dispatch => {

    const dataName = event.target.name;
    const dataValue = event.target.value;

    dispatch({
        type: UPDATE_NEWPERIODDATA_STATE,
        payload: {dataName, dataValue}
    });

};

//Update data in the state
export const valueUpdateHandlerState = (event, period, isPrices, admin) => dispatch => {

    const {data, priceList} = admin;
    const newData = {...data};
    const name = event.target.name;
    const value = event.target.value;
    if (isPrices) newData[priceList][period]["prices"][name] = value;
    newData[priceList][period][name] = value;

    dispatch({
        type: DATA_UPDATEHANDLER,
        payload: newData
    });

};

//Toggle newPeriod in the state
export const toggleNewPeriodFormState = (event) => dispatch => {
    event.preventDefault();

    dispatch({
        type: TOGGLE_NEWPERIODFORM
    });

};

//Update new pricelist name in the state
export const syncNewNameState = event => dispatch => {

    event.preventDefault();
    const newPricelistName = event.target.value;

    dispatch({
        type: SYNC_NEWNAME,
        payload: newPricelistName
    });

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

        dispatch(setAlert('Pricelist created', 'success'));

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

//Change the pricelist name
export const changePricelistName = (pricelistId, newName) => async dispatch => {
    
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({"name": newName});

        await axios.post(`/api/pricelist/update/${pricelistId}`, body, config);

        dispatch(setupAdminUpdatePage());

        dispatch(setAlert('Pricelist name changed', 'success'));
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

//Delete a pricelist
export const deletePricelist = pricelistId => async dispatch => {
    
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            await axios.post(`/api/pricelist/delete/${pricelistId}`, null, config);
    
            dispatch(setupAdminUpdatePage());
    
            dispatch(setAlert('Pricelist deleted', 'success'));
        } catch (err) {
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
            type: UPDATE_PERIOD,
            payload: res.data
        });

        dispatch(setAlert(periodId ? 'Period updated' : 'New Period added', 'success'));
        
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
        dispatch(setAlert('Period deleted', 'success'));
    } catch (err) {
        dispatch({
            type: PRICELIST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}