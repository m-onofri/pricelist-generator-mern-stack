import React from 'react';
import PropTypes from 'prop-types';

const Dates = ({valueArr, updateArrival, valueDep, updateDeparture}) => {

  //value: integer
  const twoIntString = value => {
    let stringValue = value.toString();
    if (stringValue.length < 2) stringValue = `0${stringValue}`;
    return stringValue;
  }
  
  //timestamp: timestamp (ms)
  //return: formatted datastring "yyyy-mm-dd"
  const dateValue = timestamp => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${twoIntString(date.getMonth() + 1)}-${twoIntString(date.getDate())}`;
  }

  return (
    <>
    <div className="arrival">
        <label>Arrival</label><br/>
        <input 
          type="date" 
          className="styled-input" 
          id="start"
          value={dateValue(valueArr)}
          onChange={updateArrival}/>
    </div>
    <div className="departure">
        <label>Departure</label><br/>
        <input 
          type="date" 
          className="styled-input" 
          id="end" 
          value={dateValue(valueDep)}
          onChange={updateDeparture}/>
    </div>
  </>
  )
}
  
Dates.propTypes = {
  valueArr: PropTypes.number.isRequired,
  valueDep: PropTypes.number.isRequired,
  updateArrival: PropTypes.func.isRequired,
  updateDeparture: PropTypes.func.isRequired
}

export default Dates;
