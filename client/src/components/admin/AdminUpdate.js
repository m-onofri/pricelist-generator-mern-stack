import React, {Component} from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';
import { addPeriod, deletePeriod } from '../../actions/pricelist';
import { connect } from 'react-redux';

class AdminUpdate extends Component {
    state = {
        loaded: false,
        newPeriod: false,
        data: undefined,
        newPeriodData: {periodName: "", start: "", end: "", ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, culla: 10, animal: 5, sing: 14},
        priceList: "ALL_INCLUSIVE",
        priceListId: "",
        priceLists: [],
        periods: []
    }

    componentDidMount() {
        const data = this.props.admin.pricelist;
        const priceLists = Object.keys(data);
        const priceListId = data[this.state.priceList].id;
        const periods = Object.keys(data[this.state.priceList]).filter(x => x !== 'id');
        this.setState({
            loaded: true,
            data,
            priceLists,
            priceListId,
            periods
        });
    }

    twoIntString = (value) => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = `0${stringValue}`;
        return stringValue;
    }

    dateValue = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${this.twoIntString(date.getMonth() + 1)}-${this.twoIntString(date.getDate())}`;
      }

    updatePriceList = (event) => {
        const priceList = event.target.value;
        const periods = Object.keys(this.state.data[priceList]);
        const priceListId = this.state.data[priceList].id;
        this.setState({
            priceList,
            priceListId,
            periods
        });
    }

    updateNewPeriodData = event => {
        this.setState({
            newPeriodData: { ...this.state.newPeriodData, [event.target.name]: event.target.value }
        })
    }

    displayNewPeriodForm = () => this.setState({newPeriod: true});

    hideNewPeriodForm = (event) => {
        event.preventDefault();
        this.setState({newPeriod: false});
    }

    valueUpdateHandler = (event, period, isPrices) => {
        const {data, priceList} = this.state;
        const newData = {...data};
        const name = event.target.name;
        const value = event.target.value;
        if (isPrices) newData[priceList][period]["prices"][name] = value;
        newData[priceList][period][name] = value;
        this.setState({data: newData});
    }

    addNewPeriod = async (event) => {
        event.preventDefault();
        this.setState({loaded: false});
        await this.props.addPeriod(this.state.newPeriodData, this.state.priceListId, undefined, this.props.history);
        this.setState({
            loaded: true,
            data: this.props.admin.pricelist,
            newPeriod: false
        });
    }

    deleteCurrentPeriod = async (event, periodId) => {
        event.preventDefault();
        this.setState({loaded: false});
        await this.props.deletePeriod(periodId, this.state.priceListId);
        this.setState({
            loaded: true,
            data: this.props.admin.pricelist
        });
    }

    submitHandler = async (e, periodId) => {
        e.preventDefault();
        this.setState({loaded: false});
        const period = Object.values(this.state.data[this.state.priceList]).filter(p => p._id === periodId)[0];
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

        await this.props.addPeriod(updatedPeriod, this.state.priceListId, periodId);

        this.setState({
            loaded: true,
            data: this.props.admin.pricelist
        });
    }

    displayPriceLists = () => {
        const {periods, priceList, data} = this.state;
        const priceLists = Object.values(data[priceList]);
        
        return priceLists
            .filter(v => typeof v !== "string")
            .map((p, i) => {
            return (
                <form key={uuid.v4()} >
                    <input type="text" value={p.periodName} name="periodName" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={this.dateValue(p.start)} name="start" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="date" value={this.dateValue(p.end)} name="end" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
                    <input type="number" value={p.prices.ad} name="ad" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.ad34} name="ad34" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.chd3} name="chd3" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.chd4} name="chd4" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.inf} name="inf" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.culla} name="culla" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.animal} name="animal" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input type="number" value={p.prices.sing} name="sing" step="0.01" onChange={(e) => this.valueUpdateHandler(e, periods[i], true)} required min="0"/>
                    <input className="btn btn-update" type="submit" value="Update" name="update" id={p._id} onClick={(e) => this.submitHandler(e, p._id)}/>
                    <input className="btn btn-delete" type="submit" value="Delete" name="delete" onClick={(e) => this.deleteCurrentPeriod(e, p._id)}/>
                </form>
            );
        });
    }

    newPeriod = () => {
        if (this.state.newPeriod) {
            const {periodName, start, end, ad, ad34, chd3, chd4, inf, culla, animal, sing} = this.state.newPeriodData;
            return(
                <form method="post">
                    <input type="text" name="periodName" value={periodName} required onChange={this.updateNewPeriodData}/>
                    <input type="date" name="start" value={start} required onChange={this.updateNewPeriodData}/>
                    <input type="date"  name="end" value={end} required onChange={this.updateNewPeriodData}/>
                    <input type="number" name="ad" step="0.01" value={ad} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="ad34" step="0.01" value={ad34} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="chd3" step="0.01" value={chd3} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="chd4" step="0.01" value={chd4} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="inf" step="0.01" value={inf} required min="0"onChange={this.updateNewPeriodData}/>
                    <input type="number" name="culla" step="0.01" value={culla} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="animal" step="0.01" value={animal} required min="0" onChange={this.updateNewPeriodData}/>
                    <input type="number" name="sing" step="0.01" value={sing} required min="0" onChange={this.updateNewPeriodData}/>
                    <input className="btn btn-add" type="submit" value="Add" name="add_period" onClick={(e) => this.addNewPeriod(e)}/>
                    <input className="btn btn-cancel" type="submit" value="Cancel" onClick={(e) => this.hideNewPeriodForm(e)} />
                </form>
            );
        }
    }

    render() {
        const {loaded, priceLists, priceList} = this.state;
        if (loaded) {
            return(
                <div id="admin_section">
                    <h2 className="center">Update Price Lists</h2>
                    <div className="selector">
                        <SelectListini 
                            priceLists={priceLists}
                            value={priceList}
                            updatePriceList={this.updatePriceList}
                        />
                        <button onClick={this.displayNewPeriodForm}>New Period</button>
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
                        {this.displayPriceLists()}
                        {this.newPeriod()}
                    </div>
                </div>
             );
        } else {
            return "Wait...";
        }
    }
}

AdminUpdate.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    admin: state.pricelist
 });

export default connect(mapStateToProps, { addPeriod, deletePeriod })(AdminUpdate);