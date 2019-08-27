import React from 'react';
import PropTypes from 'prop-types';
import Dates from './main_app/Dates';
import SelectListini from './SelectListini';
import Rooming from './main_app/Rooming';
import PricesList from './main_app/PricesList';
import TotalAmount from './main_app/TotalAmount';
import Spinner from './Spinner';
import './App.css';
import SeizedTable from './main_app/SizedTable';
import { connect } from 'react-redux';
import { selectPrices, manageDays, totalAmount } from '../utils/dateUtilities';
import {updatePriceListState, toggleTableState} from '../actions/pricelist';

const Dashboard = ({dashboard, updatePriceListState, toggleTableState}) => {

  const updatePriceList = event => {
    const {data, arrival, departure} = dashboard;
    const priceList = event.target.value;
    const days = manageDays(arrival, departure, data[priceList]);
    const prices = selectPrices(days, priceList, data);
    updatePriceListState({priceList, prices, days});
  }

  const {loaded, priceLists, rooming, prices, table, priceList, days} = dashboard;
  if(loaded) {
    return (
      <section className="container">
        <div className="dashboard">
          <h1 className="my-1">Dashboard</h1>
          <div className="dashboard-cmd my-1">
            <Dates />
            <SelectListini
              label={true}
              priceLists={priceLists}
              value={priceList}
              updatePriceList={updatePriceList}/> 
          </div>
          <TotalAmount />
          <div className="dashboard-prices_columns my-1">
            <Rooming />
            <PricesList />
          </div>
          <a 
            href="!#"
            onClick={(e) => {
              e.preventDefault();
              toggleTableState(!dashboard.table);
            }}
            className="btn btn-primary my-2">
              {table ? "Hide Resume" : "Display Resume"} 
              <i className={`fas ${table ? "fa-caret-up" : "fa-caret-down"} pl-1`}></i>
          </a>
          {table &&
            <SeizedTable
              days={days}
              prices={prices}
              rooming={rooming}
              total={totalAmount(dashboard)}/>
          }
        </div>
    </section>
    );
  } else  {
    return <Spinner />
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired  
}

const mapStateToProps = state => ({
  dashboard: state.pricelist
});

export default connect(mapStateToProps, { updatePriceListState, toggleTableState})(Dashboard);
