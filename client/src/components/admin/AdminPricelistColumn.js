import React from 'react';
import { connect } from 'react-redux';
import { dateValue } from '../../utils/dateUtilities';
import { valueUpdateHandlerState, addPeriod, deletePeriod } from '../../actions/admin';
import PropTypes from 'prop-types';

const AdminPricelistColumn = ({ admin, valueUpdateHandlerState, addPeriod, deletePeriod }) => {

    const submitHandler = (event, periodId) => {
        event.preventDefault();
        const period = Object.values(admin.data[admin.priceList]).filter(p => p._id === periodId)[0];
        const updatedPeriod = {
            periodName: period.periodName,
            start: period.start,
            end: period.end,
            ad: period.prices.ad,
            ad34: period.prices.ad34,
            chd3: period.prices.chd3,
            chd4: period.prices.chd4,
            inf: period.prices.inf,
            culla: period.prices.culla,
            animal: period.prices.animal,
            sing: period.prices.sing
        }
        addPeriod(updatedPeriod, admin.priceListId, periodId);
    }

    const { periods, priceList, data, priceListId } = admin;
    const priceLists = Object.values(data[priceList]);    
    const pricelistColumn = priceLists
        .filter(v => typeof v !== "string")
        .map((p, i) => {
        return (
            <div className="column price-column">
                <div className="input-block">
                    <input type="text" value={p.periodName} name="periodName" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required />
                </div>
                <div className="input-block">
                    <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.start)} name="start" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required/>
                </div>
                <div className="input-block">
                    <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.end)} name="end" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.ad} name="ad" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.ad34} name="ad34" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0" />
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.chd3} name="chd3" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.chd4} name="chd4" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.inf} name="inf" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.culla} name="culla" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.animal} name="animal" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <input type="number" value={p.prices.sing} name="sing" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                </div>
                <div className="input-block">
                    <a href="!#" className="btn btn-primary" id={p._id} onClick={(e) => submitHandler(e, p._id)}>Update</a>
                </div>
                <div className="input-block">
                    <a 
                        href="!#" 
                        className="btn btn-danger" 
                        onClick={(e) => {
                            e.preventDefault();
                            deletePeriod(p._id, priceListId);
                        }}>
                    Delete</a>
                </div>
            </div>
            );
        });

    return <>{pricelistColumn}</>
}

const mapStateToProps = state => ({
    admin: state.admin
 });

 AdminPricelistColumn.propTypes = {
    admin: PropTypes.object.isRequired,
    valueUpdateHandlerState: PropTypes.func.isRequired, 
    addPeriod: PropTypes.func.isRequired, 
    deletePeriod: PropTypes.func.isRequired
 }

export default connect(mapStateToProps, {addPeriod, valueUpdateHandlerState, deletePeriod})(AdminPricelistColumn);
