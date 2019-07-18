import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dates from './main_app/Dates';
import SelectListini from './SelectListini.js';
import Rooming from './main_app/Rooming';
import PricesList from './main_app/PricesList';
import Table from './main_app/Table';
import TotalAmount from './main_app/TotalAmount';
import './App.css';

//class Dashboard extends Component {
const Dashboard = ({data}) => {

  const [dashboardData, setDashboardData] = useState({
    data: {},
    loaded: false,
    arrival: undefined,
    departure: undefined,
    priceList: "LIDL",
    priceLists: [],
    rooming: {ad: 0, ad34: 0, chd3: 0, chd4: 0, inf: 0, animal: 0, culla: 0, sing: 0},
    days: [], //[["a", [timestamp1, timestamp2, ...], [...]]]
    prices: [] //[["a", {...}], ["b", {...}]]
  });

  //Return all days from arrival to departure
  //date, endDate: timestamps (ms)
  //priceList: object {a: {}, b: {}, ...}
  //return [["a", [timestamp1, timestamp2, ...], [...]]]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const manageDays = useCallback((date, endDate, priceList) => {
    const realEndDate = endDate - 86400000;
    let daysReservation = selectPeriods(priceList); //{a: [], b: [], ...}
    while(date <= realEndDate) {
      if(is_included(date, new Date(priceList.a.start).getTime(), new Date(priceList.a.end).getTime())) {
        daysReservation.a.push(date);
      } else if (is_included(date, new Date(priceList.b.start).getTime(), new Date(priceList.b.end).getTime())) {
        daysReservation.b.push(date);
      } else if (is_included(date, new Date(priceList.c.start).getTime(), new Date(priceList.c.end).getTime())) {
       daysReservation.c.push(date);
     } else if (is_included(date, new Date(priceList.d.start).getTime(), new Date(priceList.d.end).getTime())) {
        daysReservation.d.push(date);
      } else if (is_included(date, new Date(priceList.e.start).getTime(), new Date(priceList.e.end).getTime())) {
        daysReservation.e.push(date);
      } else if (is_included(date, new Date(priceList.f.start).getTime(), new Date(priceList.f.end).getTime())) {
        daysReservation.f.push(date);
      }
      date += 86400000;
    }
    return (Object.entries(daysReservation).filter( x => x[1].length > 0));
  })

  useEffect(() => {
    const {priceList} = dashboardData;
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const todayTimestamp = today.getTime();
    const tomorrowTimestamp = todayTimestamp + 86400000;
    const priceLists = Object.keys(data);
    const selectedDays = manageDays(todayTimestamp, tomorrowTimestamp, data[priceList]);
    setDashboardData({
      ...dashboardData,
      data,
      loaded: true,
      arrival: todayTimestamp,
      departure: tomorrowTimestamp,
      days: selectedDays,
      priceLists,
      prices: selectPrices(selectedDays, priceList, data)
    });
  }, []);

  //date, startDate, endDate: timestamps (ms)
  const is_included = (date, startDate, endDate) => {
    if(date >= startDate && date <= endDate) return true;
    return false;
  }

  //rooming, price: objects
  const dailyAmount = (rooming, price) =>{
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

  const totalAmount = () => {
    let totalAmount = [];
    const {days, rooming, priceList, data} = dashboardData;
    
    for(let i = 0; i < days.length; i++) {
      for(let j = 0; j < days[i][1].length; j++) {
        totalAmount.push(dailyAmount(rooming, data[priceList][days[i][0]].prices));
      }
    }
    return (Math.ceil(totalAmount.reduce((a, b) => a + b, 0) * 100) /100);
  }

  //priceList: object {a: {}, b: {}, ...}
  //return {a: [], b: [], ...}
  const selectPeriods = priceList => {
    return Object
                .keys(priceList)
                .reduce((obj, item) => {
                  obj[item] = [];
                  return obj;
                }, {});
  }

  

  //days: array [["a", {...}], ["b", {...}]]
  //priceList: string
  //data: object {priceList1: {a: {prices: {}, ...}, b: {prices: {}, ...}, ...}, ...}
  //Return prices of the selected periods: array [["a", {...}], ["b", {...}]]
  const selectPrices = (days, priceList, data) => days.map(([period, days]) => [period, data[priceList][period].prices]);

  const getTimestamp = event => {
    const date = event.target.value.split("-");
    date[1] = (date[1] - 1).toString();
    return new Date(...date).getTime();
  }

  const updateArrival = event => {
    const {departure, data, priceList} = dashboardData;
    const startDate = getTimestamp(event);
    if (startDate < departure) {
      let days = manageDays(startDate, departure, data[priceList]);
      setDashboardData({
        ...dashboardData,
        arrival: startDate,
        days,
        prices: selectPrices(days, priceList, data)
      });
    } else {
      setDashboardData({
        ...dashboardData,
        arrival: startDate
      });
    }
  }

  const updateDeparture = event => {
    const {arrival, data, priceList, departure} = dashboardData;
    const endDate = getTimestamp(event);
    console.log(departure - arrival);
    console.log(endDate - arrival);
    if (arrival < endDate) {
      let days = manageDays(arrival, endDate, data[priceList]);
      setDashboardData({
        ...dashboardData,
        departure: endDate,
        days,
        prices: selectPrices(days, priceList, data)
      });
    } else {
      setDashboardData({
        ...dashboardData,
        departure: endDate
      });
    }
  }

  const updatePriceList = event => {
    const {days, data} = dashboardData;
    const priceList = event.target.value;
    setDashboardData({
      ...dashboardData,
      priceList,
      prices: selectPrices(days, priceList, data)
    });
  }

  const updateRooming = event => {
    const rooming = {...dashboardData.rooming};
    const id = event.target.id;
    rooming[id] = parseInt(event.target.value);
    setDashboardData({...dashboardData, rooming});
  }

  const updatePrices = event => {
    const prices = [...dashboardData.prices];
    const section = event.target.parentNode.id;
    const id = event.target.id;
    const value = event.target.value;
    for(let i=0; i < prices.length; i++) {
      if(prices[i][0] === section) {
        prices[i][1][id] = value;
      }
    }
    setDashboardData({...dashboardData, prices});
  }

  const {loaded, arrival, departure, priceList, priceLists, rooming, days, prices} = dashboardData;
  if(loaded) {
    return (
      <div className="App">
        <div id="first_section">
          <Dates
            updateArrival={updateArrival}
            updateDeparture={updateDeparture}
            valueArr={arrival}
            valueDep={departure}/>
          <SelectListini
            priceLists={priceLists}
            value={priceList}
            updatePriceList={updatePriceList}/>
          <TotalAmount total={totalAmount()}/>
        </div>
        <div id="second_section">
          <Rooming
            value={rooming}
            updateRooming={updateRooming}/>
          <PricesList
            prices={prices}
            days={days}
            updatePrices={updatePrices}/>
        </div>
        <div id="resumeTable">
          <h2>Resume Table</h2>
          <Table 
            days={days}
            prices={prices}
            rooming={rooming}
            total={totalAmount()}/>
        </div>
      </div>
    );
  } else  {
    return "Wait...";
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired  
}

export default Dashboard;
