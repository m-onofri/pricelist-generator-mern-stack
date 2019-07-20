import React, {useState, useEffect} from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';
import { addPeriod, deletePeriod } from '../../actions/pricelist';
import { connect } from 'react-redux';

const AdminUpdate = ({addPeriod, history, deletePeriod, admin}) => {

    const [updateData, setUpdateData] = useState({
        loaded: false,
        newPeriod: false,
        data: undefined,
        newPeriodData: {periodName: "", start: "", end: "", ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, culla: 10, animal: 5, sing: 14},
        priceList: "ALL_INCLUSIVE",
        priceListId: "",
        priceLists: [],
        periods: []
    });

    useEffect(() => {
        const data = admin.pricelist;
        const priceLists = Object.keys(data);
        const priceListId = data[updateData.priceList].id;
        const periods = Object.keys(data[updateData.priceList]).filter(x => x !== 'id');
        setUpdateData(u => ({
            ...u,
            loaded: true,
            data,
            priceLists,
            priceListId,
            periods
        }));
    }, [admin.pricelist, updateData.priceList]);

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
            newPeriodData: { ...setUpdateData.newPeriodData, [event.target.name]: event.target.value }
        })
    }

    const displayNewPeriodForm = () => setUpdateData({...updateData, newPeriod: true});

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

    const addNewPeriod = async (event) => {
        event.preventDefault();
        setUpdateData({...updateData, loaded: false});
        await addPeriod(updateData.newPeriodData, updateData.priceListId, undefined, history);
        setUpdateData({
            ...updateData,
            loaded: true,
            data: this.props.admin.pricelist,
            newPeriod: false
        });
    }

    const deleteCurrentPeriod = async (event, periodId) => {
        event.preventDefault();
        setUpdateData({...updateData, loaded: false});
        await deletePeriod(periodId, updateData.priceListId);
        setUpdateData({
            ...updateData,
            loaded: true,
            data: this.props.admin.pricelist
        });
    }

    const submitHandler = async (e, periodId) => {
        e.preventDefault();
        setUpdateData({...updateData, loaded: false});
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

        await addPeriod(updatedPeriod, updateData.priceListId, periodId);

        setUpdateData({
            ...updateData,
            loaded: true,
            data: this.props.admin.pricelist
        });
    }

    const displayPriceLists = () => {
        const {periods, priceList, data} = updateData;
        const priceLists = Object.values(data[priceList]);
        
        return priceLists
            .filter(v => typeof v !== "string")
            .map((p, i) => {
            return (
                <form key={uuid.v4()} >
                    <input type="text" value={p.periodName} name="periodName" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={dateValue(p.start)} name="start" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={dateValue(p.end)} name="end" onChange={(e) => valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="number" value={p.prices.ad} name="ad" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.ad34} name="ad34" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.chd3} name="chd3" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.chd4} name="chd4" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.inf} name="inf" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.culla} name="culla" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.animal} name="animal" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.sing} name="sing" step="0.01" onChange={(e) => valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input className="btn btn-update" type="submit" value="Update" name="update" id={p._id} onClick={(e) => submitHandler(e, p._id)}/>
                    <input className="btn btn-delete" type="submit" value="Delete" name="delete" onClick={(e) => deleteCurrentPeriod(e, p._id)}/>
                </form>
            );
        });
    }

    const newPeriod = () => {
        if (updateData.newPeriod) {
            const {periodName, start, end, ad, ad34, chd3, chd4, inf, culla, animal, sing} = updateData.newPeriodData;
            return(
                <form method="post">
                    <input type="text" name="periodName" value={periodName} required onChange={updateNewPeriodData}/>
                    <input type="date" name="start" value={start} required onChange={updateNewPeriodData}/>
                    <input type="date"  name="end" value={end} required onChange={updateNewPeriodData}/>
                    <input type="number" name="ad" step="0.01" value={ad} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="ad34" step="0.01" value={ad34} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="chd3" step="0.01" value={chd3} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="chd4" step="0.01" value={chd4} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="inf" step="0.01" value={inf} required min="0"onChange={updateNewPeriodData}/>
                    <input type="number" name="culla" step="0.01" value={culla} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="animal" step="0.01" value={animal} required min="0" onChange={updateNewPeriodData}/>
                    <input type="number" name="sing" step="0.01" value={sing} required min="0" onChange={updateNewPeriodData}/>
                    <input className="btn btn-add" type="submit" value="Add" name="add_period" onClick={(e) => addNewPeriod(e)}/>
                    <input className="btn btn-cancel" type="submit" value="Cancel" onClick={(e) => hideNewPeriodForm(e)} />
                </form>
            );
        }
    }

    const {loaded, priceLists, priceList} = updateData;
    if (loaded) {
        return(
            <div id="admin_section">
                <h2 className="center">Update Price Lists</h2>
                <div className="selector">
                    <SelectListini 
                        priceLists={priceLists}
                        value={priceList}
                        updatePriceList={updatePriceList}
                    />
                    <button onClick={displayNewPeriodForm}>New Period</button>
                </div>
                <div className="container">
                    <div className="header">
                        <p>Period</p>
                        <p>Start</p>
                        <p>End</p>
                        <p>ad</p>
                        <p>ad34</p>
                        <p>chd3</p>
                        <p>chd4</p>
                        <p>Infant</p>
                        <p>Cot</p>
                        <p>Animal</p>
                        <p>Single room</p>
                    </div>
                    {displayPriceLists()}
                    {newPeriod()}
                </div>
            </div>
            );
    } else {
        return "Wait...";
    }
}

AdminUpdate.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    admin: state.pricelist
 });

export default connect(mapStateToProps, { addPeriod, deletePeriod })(AdminUpdate);