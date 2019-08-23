import React from 'react';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { 
    addPeriod, 
    deletePeriod, 
    changePricelistName, 
    deletePricelist, 
    updatePriceListState,
    toggleNewPeriodFormState,
    updateNewPeriodDataState,
    syncNewNameState,
    valueUpdateHandlerState
} from '../../actions/admin';

const AdminUpdate = ({addPeriod, deletePricelist, deletePeriod, admin, changePricelistName, updatePriceListState, toggleNewPeriodFormState, updateNewPeriodDataState, syncNewNameState, valueUpdateHandlerState}) => {

    const twoIntString = value => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = `0${stringValue}`;
        return stringValue;
    }

    const dateValue = timestamp => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${twoIntString(date.getMonth() + 1)}-${twoIntString(date.getDate())}`;
      }

    const addNewPeriod = event => {
        event.preventDefault();
        addPeriod(admin.newPeriodData, admin.priceListId, undefined);
    }

    const deleteCurrentPeriod = (event, periodId) => {
        event.preventDefault();
        deletePeriod(periodId, admin.priceListId);
    }

    const updatePricelistName = event => {
        event.preventDefault();
        changePricelistName(admin.priceListId, admin.newPricelistName);
    }

    const removePricelist = event => {
        event.preventDefault();
        if (window.confirm('Are you sure? This can NOT be undone!')) {
            deletePricelist(admin.priceListId);
        }
    }

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

    const displayPriceLists = () => {
        const {periods, priceList, data} = admin;
        const priceLists = Object.values(data[priceList]);
        
        return priceLists
            .filter(v => typeof v !== "string")
            .map((p, i) => {
            return (
                <div class="column price-column">
                    <div class="input-block">
                        <input type="text" value={p.periodName} name="periodName" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required />
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.start)} name="start" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required/>
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.end)} name="end" onChange={(e) => valueUpdateHandlerState(e, periods[i], false, admin)} required/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.ad} name="ad" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.ad34} name="ad34" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0" />
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.chd3} name="chd3" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.chd4} name="chd4" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.inf} name="inf" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.culla} name="culla" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.animal} name="animal" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.sing} name="sing" step="0.01" onChange={(e) => valueUpdateHandlerState(e, periods[i], true, admin)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-primary" id={p._id} onClick={(e) => submitHandler(e, p._id)}>Update</a>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-danger" onClick={(e) => deleteCurrentPeriod(e, p._id)}>Delete</a>
                    </div>
                </div>
            );
        });
    }

    const newPeriod = () => {
        if (admin.newPeriod) {
            const {periodName, start, end, ad, ad34, chd3, chd4, inf, culla, animal, sing} = admin.newPeriodData;
            return(
                <div class="column price-column">
                    <div class="input-block">
                        <input type="text" name="periodName" value={periodName} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" name="start" value={start} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="date" style={{"padding": "0.215rem 0"}} name="end" value={end} required onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="ad" step="0.01" value={ad} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="ad34" step="0.01" value={ad34} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="chd3" step="0.01" value={chd3} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="chd4" step="0.01" value={chd4} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="inf" step="0.01" value={inf} required min="0"onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="culla" step="0.01" value={culla} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="animal" step="0.01" value={animal} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="sing" step="0.01" value={sing} required min="0" onChange={updateNewPeriodDataState}/>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-success" onClick={(e) => addNewPeriod(e)}>Add</a>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-danger" onClick={toggleNewPeriodFormState}>Back</a>
                    </div>
                </div>
            );
        }
    }

    const {loaded, priceLists, priceList, newPricelistName} = admin;
    if (loaded) {
        return(
            <section className="container">
                <div className="admin-update">
                    <h1 className="my-1">Update Pricelist</h1>
                    <div className="admin-update-cmd my-1">
                        <SelectListini
                            label={false}
                            priceLists={priceLists}
                            value={priceList}
                            data={admin.data}
                            updatePriceList={updatePriceListState}
                        />
                        <a 
                            href="!#"
                            className="btn btn-primary btn-long"
                            onClick={toggleNewPeriodFormState}>Add New Period</a>
                        <a 
                            href="!#"
                            onClick={removePricelist}
                            className="btn btn-danger btn-long">Delete Pricelist</a>
                        <div className="pricelist-name">
                            <input 
                                className="styled-input"
                                type="text"
                                value={newPricelistName}
                                onChange={syncNewNameState}/>
                        </div>
                        <a 
                            href="!#"
                            onClick={updatePricelistName}
                            className="btn btn-primary btn-long">Change Pricelist Name</a>
                    </div>
                    <div className="admin-update-prices_columns my-1">
                        <div className="column rooming-column">
                            <div class="input-block">
                                <label>Period</label>
                            </div>
                            <div class="input-block">
                                <label>From</label>
                            </div>
                            <div class="input-block">
                                <label>To</label>
                            </div>
                            <div class="input-block">
                                <label>Adulti</label>
                            </div>
                            <div class="input-block">
                                <label>Ad 3-4</label>
                            </div>
                            <div class="input-block">
                                <label>Chd 3</label>
                            </div>
                            <div class="input-block">
                                <label>Chd 4</label>
                            </div>
                            <div class="input-block">
                                <label>Infant</label>
                            </div>
                            <div class="input-block">
                                <label>Culla</label>
                            </div>
                            <div class="input-block">
                                <label>Animal</label>
                            </div>
                            <div class="input-block">
                                <label>Sup. sing</label>
                            </div>
                        </div>
                        {displayPriceLists()}
                        {newPeriod()}
                    </div>
                </div>
            </section>
            );
    } else {
        return <Spinner />;
    }
}

AdminUpdate.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    admin: state.admin
 });

export default connect(mapStateToProps, { addPeriod, deletePeriod, changePricelistName, deletePricelist, updatePriceListState,toggleNewPeriodFormState, updateNewPeriodDataState, syncNewNameState, valueUpdateHandlerState })(AdminUpdate);