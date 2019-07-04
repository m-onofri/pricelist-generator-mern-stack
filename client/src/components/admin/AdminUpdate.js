import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectListini from '../SelectListini';

class AdminUpdate extends Component {
    state = {
        loaded: false,
        newPeriod: false,
        data: undefined,
        priceList: "ALL_INCLUSIVE",
        priceLists: [],
        periods: []
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
        this.setState({
            priceList,
            periods
        });
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

    displayPriceLists = () => {
        const {periods, priceList, data} = this.state;
        const priceLists = Object.values(data[priceList]);
        return priceLists.map((p, i) => {
            return (
                <form key={i} method="post" action="http://localhost:9000/priceList/manage">
                    <input type="text" value={p.period} name="period" onChange={(e) => this.valueUpdateHandler(e, periods[i], false)} required/>
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
                    <input type="hidden" value={p._id} name="id" />
                    <input className="btn btn-update" type="submit" value="Update" name="update" id={p._id} onClick={(e) => this.submitHandler(e, i)}/>
                    <input className="btn btn-delete" type="submit" value="Delete" name="delete"/>
                </form>
            );
        });
    }

    addNewPeriod = () => {
        if (this.state.newPeriod) {
            return(
                <form method="post" action="http://localhost:9000/priceList/addNewPeriod">
                    <input type="text" name="period" required/>
                    <input type="date" name="start" required/>
                    <input type="date"  name="end" required/>
                    <input type="number" name="ad" step="0.01" required min="0"/>
                    <input type="number" name="ad34" step="0.01" required min="0"/>
                    <input type="number" name="chd3" step="0.01" required min="0"/>
                    <input type="number" name="chd4" step="0.01" required min="0"/>
                    <input type="number" name="inf" step="0.01" required min="0"/>
                    <input type="number" name="culla" step="0.01" defaultValue={10} required min="0"/>
                    <input type="number" name="animal" step="0.01" defaultValue={5} required min="0"/>
                    <input type="number" name="sing" step="0.01" defaultValue={15} required min="0"/>
                    <input className="btn btn-add" type="submit" value="Add" name="add_period"/>
                    <input className="btn btn-cancel" type="submit" value="Cancel" onClick={(e) => this.hideNewPeriodForm(e)} />
                </form>
            );
        }
    }

    componentDidMount() {
        const data = this.props.data;
        const priceLists = Object.keys(data);
        const periods = Object.keys(data[this.state.priceList]);
        this.setState({
            loaded: true,
            data,
            priceLists,
            periods
        });
    }

    displayFeedback = () => {
        const {message, success} = this.state;
        if (message) {
            return (
                <div className={success ? "success" : "error"}>
                    <p>{message}</p>
                </div>
            );
        }
    }

    submitHandler = (e, i) => {
        e.preventDefault();
        const {data, priceList} = this.state;
        const updatedPeriod = Object.values(data[priceList]).filter(p => p._id === e.target.id)[0];
        
        this.setState({
            loaded: false,
          });
        
        fetch('http://localhost:9000/priceList/manage', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({priceList: JSON.stringify(updatedPeriod), update: "Update"})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                this.setState({
                    success: true,
                    message: json.message,
                    loaded: true
                });
            } else {
                this.setState({
                    success: false,  
                    message: json.message,
                    loaded: true,
                });
            }
        });
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
                    { this.displayFeedback() }
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
                        {this.addNewPeriod()}
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

export default AdminUpdate;