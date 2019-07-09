import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import pricelist from './pricelist';

export default combineReducers({
    alert,
    auth,
    pricelist
});