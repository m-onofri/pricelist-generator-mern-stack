import React from 'react';
import PropTypes from 'prop-types';

const Dates = ({valueArr, updateArrival, valueDep, updateDeparture}) =>
  <>
    <div id="arrival">
      <label>Arrival</label>
      <input
        id="start"
        type="date"
        value={valueArr}
        onChange={updateArrival} />
    </div>
    <div id="departure">
      <label>Departure</label>
      <input
        id="end"
        type="date"
        value={valueDep}
        onChange={updateDeparture} />
    </div>
  </>

Dates.propTypes = {
  valueArr: PropTypes.string.isRequired,
  valueDep: PropTypes.string.isRequired,
  updateArrival: PropTypes.func.isRequired,
  updateDeparture: PropTypes.func.isRequired
}

export default Dates;
