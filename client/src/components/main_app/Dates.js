import React from 'react';
import PropTypes from 'prop-types';
import { dateValue, getTimestamp, manageDays, selectPrices } from '../../utils/dateUtilities';
import { connect } from 'react-redux';
import { updateArrivalState, updateDepartureState } from '../../actions/pricelist';

const Dates = ({datesProps: {arrival, departure, data, priceList}, updateArrivalState, updateDepartureState}) => {

  const updateArrival = event => {
    const startDate = getTimestamp(event);
    if (startDate < departure) {
      let days = manageDays(startDate, departure, data[priceList]);
      const prices= selectPrices(days, priceList, data);
      updateArrivalState({arrival: startDate, days, prices});
    } else {
      updateArrivalState({arrival: startDate});
    }
  }

  const updateDeparture = event => {
    const endDate = getTimestamp(event);
    if (arrival < endDate) {
      let days = manageDays(arrival, endDate, data[priceList]);
      const prices = selectPrices(days, priceList, data);
      updateDepartureState({departure: endDate, days, prices});
    } else {
      updateDepartureState({departure: endDate});
    }
  }

  return (
    <>
    <div className="arrival">
        <label>Arrival</label><br/>
        <input 
          type="date" 
          className="styled-input" 
          id="start"
          value={dateValue(arrival)}
          onChange={updateArrival}/>
    </div>
    <div className="departure">
        <label>Departure</label><br/>
        <input 
          type="date" 
          className="styled-input" 
          id="end" 
          value={dateValue(departure)}
          onChange={updateDeparture}/>
    </div>
  </>
  )
}
  
Dates.propTypes = {
  datesProps: PropTypes.object.isRequired,
  updateArrivalState: PropTypes.func.isRequired,
  updateDepartureState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  datesProps: state.pricelist
});

export default connect(mapStateToProps, {updateArrivalState, updateDepartureState})(Dates);
