import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import pricelist from './pricelist';
import admin from './admin';

export default combineReducers({
    alert,
    auth,
    pricelist,
    admin
});