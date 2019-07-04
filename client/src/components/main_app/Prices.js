import React from 'react';
import PropTypes from 'prop-types';

const Prices = ({days, id, value, updatePrices}) => {

  const daysNumber = days.length;
  const lastDay = days[daysNumber - 1] + 86400000;
  const firstDay = days[0];

  function renderDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  return(
    <div className="list" id={id} >
      <p style={{textAlign: 'center'}}>Days: {daysNumber}</p>
      <p style={{textAlign: "center"}}>from {renderDate(firstDay)}</p>
      <p style={{textAlign: "center"}}>to {renderDate(lastDay)}</p>
      <input id="ad" type="number" value={value.ad} onChange={updatePrices}/>
      <input id="ad34" type="number" value={value.ad34} onChange={updatePrices}/>
      <input id="chd3" type="number" value={value.chd3} onChange={updatePrices}/>
      <input id="chd4" type="number" value={value.chd4} onChange={updatePrices}/>
      <input id="inf" type="number" value={value.inf} onChange={updatePrices}/>
      <input id="animal" type="number" value={value.animal} onChange={updatePrices}/>
      <input id="culla" type="number" value={value.culla} onChange={updatePrices}/>
      <input id="sing" type="number" value={value.sing} onChange={updatePrices}/>
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
