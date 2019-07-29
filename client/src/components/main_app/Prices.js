import React from 'react';
import PropTypes from 'prop-types';

const Prices = ({days, id, value, updatePrices}) => {

  const daysNumber = days.length;
  const lastDay = days[daysNumber - 1] + 86400000;
  const firstDay = days[0];

  const renderDate = timestamp => {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  return(
    <div class="column price-column" id={id}>
      <h3>Days: {daysNumber}</h3>
      <p>from {renderDate(firstDay)}</p>
      <p>to {renderDate(lastDay)}</p>
      <div class="input-block">
          <input 
            type="number"
            id="ad"
            value={value.ad} 
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="ad34"
            value={value.ad34} 
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="chd3" 
            value={value.chd3} 
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="chd4"
            value={value.chd4}
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="inf"
            value={value.inf}
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="animal"
            value={value.animal}
            onChange={updatePrices}/>
      </div>
      <div class="input-block">
          <input 
            type="number" 
            id="culla"
            value={value.culla} 
            onChange={updatePrices}
            />
      </div>
      <div class="input-block">
          <input 
            type="number"
            id="sing"
            value={value.sing} 
            onChange={updatePrices}/>
      </div>
    </div>
  );
}

Prices.propTypes = {
  days: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  updatePrices: PropTypes.func.isRequired
}

export default Prices;
