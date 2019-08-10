import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Dates from './main_app/Dates';
import SelectListini from './SelectListini';
import Rooming from './main_app/Rooming';
import PricesList from './main_app/PricesList';
import TotalAmount from './main_app/TotalAmount';
import Spinner from './Spinner';
import './App.css';
import SeizedTable from './main_app/SizedTable';

const Dashboard = ({data}) => {

  const [dashboardData, setDashboardData] = useState({
    data: {},
    table: false,
    loaded: false,
    arrival: undefined,
    departure: undefined,
    priceList: "",
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
    const periodsList = Object.keys(daysReservation);
    while(date <= realEndDate) {
      for(let x = 0; x < periodsList.length; x++) {
        const p = periodsList[x];
        if(is_included(date, new Date(priceList[p].start).getTime(), new Date(priceList[p].end).getTime())) {
          daysReservation[p].push(date);
        }
      }
      date += 86400000;
    }
    return (Object.entries(daysReservation).filter( x => x[1].length > 0));
  })

  useEffect(() => {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const todayTimestamp = today.getTime();
    const tomorrowTimestamp = todayTimestamp + 86400000;
    const priceLists = Object.keys(data);
    const priceList = priceLists[0];
    const selectedDays = manageDays(todayTimestamp, tomorrowTimestamp, data[priceList]);
    const prices = selectPrices(selectedDays, priceList, data);
    setDashboardData(d => ({
      ...d,
      data,
      loaded: true,
      arrival: todayTimestamp,
      departure: tomorrowTimestamp,
      days: selectedDays,
      priceList,
      priceLists,
      prices
    }));
  }, [data]);

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
  const selectPrices = (days, priceList, data) => days.map(([period, ]) => [period, data[priceList][period].prices]);

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
    const {arrival, data, priceList} = dashboardData;
    const endDate = getTimestamp(event);
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
    const section = event.target.parentNode.parentNode.id;
    const id = event.target.id;
    const value = event.target.value;
    for(let i=0; i < prices.length; i++) {
      if(prices[i][0] === section) {
        prices[i][1][id] = value;
      }
    }
    setDashboardData({...dashboardData, prices});
  }

  const toggleTable = (event) => {
    event.preventDefault();
    const table = !dashboardData.table;
    setDashboardData({...dashboardData, table});
  }

  const {loaded, arrival, departure, priceList, priceLists, rooming, days, prices, table} = dashboardData;
  if(loaded) {
    return (
      <section className="container">
        <div className="dashboard">
          <h1 className="my-1">Dashboard</h1>
          <div className="dashboard-cmd my-1">
            <Dates
              updateArrival={updateArrival}
              updateDeparture={updateDeparture}
              valueArr={arrival}
              valueDep={departure}/>
            <SelectListini
              label={true}
              priceLists={priceLists}
              value={priceList}
              updatePriceList={updatePriceList}/> 
          </div>
          <TotalAmount total={totalAmount()}/>
          <div className="dashboard-prices_columns my-1">
            <Rooming
              value={rooming}
              updateRooming={updateRooming}/>
            <PricesList
            prices={prices}
            days={days}
            updatePrices={updatePrices}/>
          </div>
          <a 
            href="!#"
            onClick={toggleTable}
            className="btn btn-primary my-2">
              {table ? "Hide Resume" : "Display Resume"} 
              <i className={`fas ${table ? "fa-caret-up" : "fa-caret-down"} pl-1`}></i>
          </a>
          {table &&
            <SeizedTable
              days={days}
              prices={prices}
              rooming={rooming}
              total={totalAmount()}/>
          }
        </div>
    </section>
    );
  } else  {
    return <Spinner />
  }
}

Dashboard.propTypes = {
  data: PropTypes.object.isRequired  
}

export default Dashboard;
