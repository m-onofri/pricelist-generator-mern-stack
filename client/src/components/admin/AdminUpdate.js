import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';
import { addPeriod, deletePeriod, changePricelistName, deletePricelist, getCurrentPricelist } from '../../actions/pricelist';
import Spinner from '../Spinner';
import { connect } from 'react-redux';

const AdminUpdate = ({addPeriod, deletePricelist, deletePeriod, admin, changePricelistName}) => {

    const [updateData, setUpdateData] = useState({
        loaded: false,
        newPeriod: false,
        data: undefined,
        newPeriodData: {periodName: "", start: "", end: "", ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, culla: 10, animal: 5, sing: 14},
        priceList: "",
        newPricelistName: "",
        priceListId: "",
        priceLists: [],
        periods: []
    });

    useEffect(() => {
        getCurrentPricelist();
        const data = admin.pricelist;
        const priceLists = Object.keys(data);
        const priceList = priceLists[0];
        const priceListId = data[priceList].id;
        const periods = Object.keys(data[priceList]).filter(x => x !== 'id');
        setUpdateData(u => ({
            ...u,
            loaded: true,
            data,
            priceLists,
            newPricelistName: "New Pricelist Name",
            newPeriod: false,
            priceList,
            priceListId,
            periods
        }));
    }, [admin.pricelist]);

    const twoIntString = value => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = `0${stringValue}`;
        return stringValue;
    }

    const dateValue = timestamp => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${twoIntString(date.getMonth() + 1)}-${twoIntString(date.getDate())}`;
      }

    const updatePriceList = event => {
        const priceList = event.target.value;
        const periods = Object.keys(updateData.data[priceList]);
        const priceListId = updateData.data[priceList].id;
        setUpdateData({
            ...updateData,
            priceList,
            priceListId,
            periods
        });
    }

    const updateNewPeriodData = event => {
        setUpdateData({
            ...updateData,
            newPeriodData: { ...updateData.newPeriodData, [event.target.name]: event.target.value }
        })
    }

    const displayNewPeriodForm = event => {
        event.preventDefault();
        setUpdateData({...updateData, newPeriod: true});
    }

    const hideNewPeriodForm = event => {
        event.preventDefault();
        setUpdateData({...updateData, newPeriod: false});
    }

    const valueUpdateHandler = (event, period, isPrices) => {
        const {data, priceList} = updateData;
        const newData = {...data};
        const name = event.target.name;
        const value = event.target.value;
        if (isPrices) newData[priceList][period]["prices"][name] = value;
        newData[priceList][period][name] = value;
        setUpdateData({...updateData, data: newData});
    }

    const addNewPeriod = event => {
        event.preventDefault();
        addPeriod(updateData.newPeriodData, updateData.priceListId, undefined);
    }

    const deleteCurrentPeriod = (event, periodId) => {
        event.preventDefault();
        deletePeriod(periodId, updateData.priceListId);
    }

    const syncNewName = (event) => {
        event.preventDefault();
        const newPricelistName = event.target.value;
        setUpdateData({...updateData, newPricelistName});
    }

    const updatePricelistName = event => {
        event.preventDefault();
        changePricelistName(updateData.priceListId, updateData.newPricelistName);
    }

    const removePricelist = event => {
        event.preventDefault();
        if (window.confirm('Are you sure? This can NOT be undone!')) {
            deletePricelist(updateData.priceListId);
        }
    }

    const submitHandler = (event, periodId) => {
        event.preventDefault();
        const period = Object.values(updateData.data[updateData.priceList]).filter(p => p._id === periodId)[0];
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
        addPeriod(updatedPeriod, updateData.priceListId, periodId);
    }

    const displayPriceLists = () => {
        const {periods, priceList, data} = updateData;
        const priceLists = Object.values(data[priceList]);
        
        return priceLists
            .filter(v => typeof v !== "string")
            .map((p, i) => {
            return (
                <div class="column price-column">
                    <div class="input-block">
                        <input type="text" value={p.periodName} name="periodName" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required />
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.start)} name="start" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required/>
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" value={dateValue(p.end)} name="end" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.ad} name="ad" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.ad34} name="ad34" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0" />
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.chd3} name="chd3" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.chd4} name="chd4" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.inf} name="inf" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.culla} name="culla" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.animal} name="animal" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    </div>
                    <div class="input-block">
                        <input type="number" value={p.prices.sing} name="sing" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
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
        if (updateData.newPeriod) {
            const {periodName, start, end, ad, ad34, chd3, chd4, inf, culla, animal, sing} = updateData.newPeriodData;
            return(
                <div class="column price-column">
                    <div class="input-block">
                        <input type="text" name="periodName" value={periodName} required onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input style={{"padding": "0.215rem 0"}} type="date" name="start" value={start} required onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="date" style={{"padding": "0.215rem 0"}} name="end" value={end} required onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="ad" step="0.01" value={ad} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="ad34" step="0.01" value={ad34} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="chd3" step="0.01" value={chd3} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="chd4" step="0.01" value={chd4} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="inf" step="0.01" value={inf} required min="0"onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="culla" step="0.01" value={culla} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="animal" step="0.01" value={animal} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <input type="number" name="sing" step="0.01" value={sing} required min="0" onChange={updateNewPeriodData}/>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-success" onClick={(e) => addNewPeriod(e)}>Add</a>
                    </div>
                    <div class="input-block">
                        <a href="!#" class="btn btn-danger" onClick={(e) => hideNewPeriodForm(e)}>Back</a>
                    </div>
                </div>
            );
        }
    }

    const {loaded, priceLists, priceList, newPricelistName} = updateData;
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
                            updatePriceList={updatePriceList}
                        />
                        <a 
                            href="!#"
                            className="btn btn-primary btn-long"
                            onClick={displayNewPeriodForm}>Add New Period</a>
                        <a 
                            href="!#"
                            onClick={removePricelist}
                            className="btn btn-danger btn-long">Delete Pricelist</a>
                        <div className="pricelist-name">
                            <input 
                                className="styled-input"
                                type="text"
                                value={newPricelistName}
                                onChange={syncNewName}/>
                        </div>
                        <a 
                            href="!#"
                            onClick={updatePricelistName}
                            className="btn btn-primary btn-long">Change Pricelist Name</a>
                    </div>
                    <div className="admin-update-prices_columns my-1">
                        <div className="column rooming-column">
                            <div class="input-block">
                                <label for="">Period</label>
                            </div>
                            <div class="input-block">
                                <label for="">From</label>
                            </div>
                            <div class="input-block">
                                <label for="">To</label>
                            </div>
                            <div class="input-block">
                                <label for="">Adulti</label>
                            </div>
                            <div class="input-block">
                                <label for="">Ad 3-4</label>
                            </div>
                            <div class="input-block">
                                <label for="">Chd 3</label>
                            </div>
                            <div class="input-block">
                                <label for="">Chd 4</label>
                            </div>
                            <div class="input-block">
                                <label for="">Infant</label>
                            </div>
                            <div class="input-block">
                                <label for="">Culla</label>
                            </div>
                            <div class="input-block">
                                <label for="">Animal</label>
                            </div>
                            <div class="input-block">
                                <label for="">Sup. sing</label>
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
    admin: state.pricelist
 });

export default connect(mapStateToProps, { addPeriod, deletePeriod, changePricelistName, deletePricelist, getCurrentPricelist })(AdminUpdate);