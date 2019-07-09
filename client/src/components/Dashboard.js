import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dates from './main_app/Dates';
import SelectListini from './SelectListini.js';
import Rooming from './main_app/Rooming';
import PricesList from './main_app/PricesList';
import Table from './main_app/Table';
import TotalAmount from './main_app/TotalAmount';
import './App.css';

class Dashboard extends Component {
  state = {
    data: {},
    loaded: false,
    arrival: undefined,
    departure: undefined,
    priceList: "LIDL",
    priceLists: [],
    rooming: {ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, animal: 0, culla: 0, sing: 0},
    days: [], //[["a", [timestamp1, timestamp2, ...], [...]]]
    prices: [] //[["a", {...}], ["b", {...}]]
  }

  componentDidMount() {
    const {data} = this.props;
    const {priceList} = this.state;
    const today = new Date();
    const todayTimestamp = today.getTime();
    const tomorrowTimestamp = todayTimestamp + 86400000;
    const priceLists = Object.keys(data);
    const selectedDays = this.manageDays(todayTimestamp, tomorrowTimestamp, data[priceList]);
    this.setState({
      data,
      loaded: true,
      arrival: todayTimestamp,
      departure: tomorrowTimestamp,
      days: selectedDays,
      priceLists,
      prices: this.selectPrices(selectedDays, this.state.priceList, data)
    });
  }

  //value: integer
  twoIntString = (value) => {
    let stringValue = value.toString();
    if (stringValue.length < 2) stringValue = `0${stringValue}`;
    return stringValue;
  }

  //date, startDate, endDate: timestamps (ms)
  is_included = (date, startDate, endDate) => {
    if(date >= startDate && date <= endDate) return true;
    return false;
  }

  //rooming, price: objects
  dailyAmount = (rooming, price) =>{
    const total = (rooming.ad * price.ad +
                  rooming.ad34 * price.ad34 +
                  rooming.chd3 * price.chd3 +
                  rooming.chd4 * price.chd4 +
                  rooming.inf * price.inf +
                  rooming.animal * price.animal +
                  rooming.culla * price.culla +
                  rooming.sing * price.sing);
    return Math.round(total * 100) / 100;
  }

  totalAmount = () => {
    let totalAmount = [];
    const {days, rooming, priceList, data} = this.state;
    
    for(let i = 0; i < days.length; i++) {
      for(let j = 0; j < days[i][1].length; j++) {
        totalAmount.push(this.dailyAmount(rooming, data[priceList][days[i][0]].prices));
      }
    }
    return (Math.ceil(totalAmount.reduce((a, b) => a + b, 0) * 100) /100);
  }

  //priceList: object {a: {}, b: {}, ...}
  //return {a: [], b: [], ...}
  selectPeriods = (priceList) => {
    return Object
                .keys(priceList)
                .reduce((obj, item) => {
                  obj[item] = [];
                  return obj;
                }, {});
  }

  //Return all days from arrival to departure
  //date, endDate: timestamps (ms)
  //priceList: object {a: {}, b: {}, ...}
  //return [["a", [timestamp1, timestamp2, ...], [...]]]
  manageDays = (date, endDate, priceList) => {
    const realEndDate = endDate - 86400000;
    let daysReservation = this.selectPeriods(priceList); //{a: [], b: [], ...}
    while(date <= realEndDate) {
      if(this.is_included(date, new Date(priceList.a.start).getTime(), new Date(priceList.a.end).getTime())) {
        daysReservation.a.push(date);
      } else if (this.is_included(date, new Date(priceList.b.start).getTime(), new Date(priceList.b.end).getTime())) {
        daysReservation.b.push(date);
      } else if (this.is_included(date, new Date(priceList.c.start).getTime(), new Date(priceList.c.end).getTime())) {
       daysReservation.c.push(date);
     } else if (this.is_included(date, new Date(priceList.d.start).getTime(), new Date(priceList.d.end).getTime())) {
        daysReservation.d.push(date);
      } else if (this.is_included(date, new Date(priceList.e.start).getTime(), new Date(priceList.e.end).getTime())) {
        daysReservation.e.push(date);
      } else if (this.is_included(date, new Date(priceList.f.start).getTime(), new Date(priceList.f.end).getTime())) {
        daysReservation.f.push(date);
      }
      date += 86400000;
    }
    return (Object.entries(daysReservation).filter( x => x[1].length > 0));
  }

  //days: array [["a", {...}], ["b", {...}]]
  //priceList: string
  //data: object {priceList1: {a: {prices: {}, ...}, b: {prices: {}, ...}, ...}, ...}
  //Return prices of the selected periods: array [["a", {...}], ["b", {...}]]
  selectPrices = (days, priceList, data) => days.map(([period, days]) => [period, data[priceList][period].prices]);

  getTimestamp = (event) => {
    const date = event.target.value.split("-");
    date[1] = (date[1] - 1).toString();
    return new Date(...date).getTime();
  }

  updateArrival = (event) => {
    const {departure, data, priceList} = this.state;
    const startDate = this.getTimestamp(event);
    if (startDate < departure) {
      let days = this.manageDays(startDate, departure, data[priceList]);
      this.setState({
        arrival: startDate,
        days,
        prices: this.selectPrices(days, priceList, data)
      });
    } else {
      this.setState({arrival: startDate});
    }
  }

  updateDeparture = (event) => {
    const {arrival, data, priceList} = this.state;
    const endDate = this.getTimestamp(event);
    if (arrival < endDate) {
      let days = this.manageDays(arrival, endDate, data[priceList]);
      this.setState({
        departure: endDate,
        days,
        prices: this.selectPrices(days, priceList, data)
      });
    } else {
      this.setState({departure: endDate});
    }
  }

  //timestamp: timestamp (ms)
  //return: formatted datastring "yyyy-mm-dd"
  dateValue = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${this.twoIntString(date.getMonth() + 1)}-${this.twoIntString(date.getDate())}`;
  }

  updatePriceList = (event) => {
    const {days, data} = this.state;
    const priceList = event.target.value;
    this.setState({
      priceList,
      prices: this.selectPrices(days, priceList, data)
    });
  }

  updateRooming = (event) => {
    const rooming = {...this.state.rooming};
    const id = event.target.id;
    rooming[id] = parseInt(event.target.value);
    this.setState({rooming});
  }

  updatePrices = (event) => {
    const prices = [...this.state.prices];
    const section = event.target.parentNode.id;
    const id = event.target.id;
    const value = event.target.value;
    for(let i=0; i < prices.length; i++) {
      if(prices[i][0] === section) {
        prices[i][1][id] = value;
      }
    }
    this.setState({prices});
  }

  render() {
    const {loaded, arrival, departure, priceList, priceLists, rooming, days, prices} = this.state;
    if(loaded) {
      return (
        <div className="App">
          <div id="first_section">
            <Dates
              updateArrival={this.updateArrival}
              updateDeparture={this.updateDeparture}
              valueArr={this.dateValue(arrival)}
              valueDep={this.dateValue(departure)}/>
            <SelectListini
              priceLists={priceLists}
              value={priceList}
              updatePriceList={this.updatePriceList}/>
            <TotalAmount total={this.totalAmount()}/>
          </div>
          <div id="second_section">
            <Rooming
              value={rooming}
              updateRooming={this.updateRooming}/>
            <PricesList
              prices={prices}
              days={days}
              updatePrices={this.updatePrices}/>
          </div>
          <div id="resumeTable">
            <h2>Resume Table</h2>
            <Table 
              days={days}
              prices={prices}
              rooming={rooming}
              total={this.totalAmount()}/>
          </div>
        </div>
      );
    } else  {
      return "Wait...";
    }
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired  
}

export default Dashboard;
