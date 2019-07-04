import React from 'react';
import Prices from './Prices';
import PropTypes from 'prop-types';

const PricesList = ({prices, days, updatePrices}) =>
  <>
    {prices.map(([period, pricesObj], i) => 
      <Prices
        key={i}
        days={days[i][1]}
        id={period}
        value={pricesObj}
        updatePrices={updatePrices}/>
    )}
  </>

PricesList.propTypes = {
  prices: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired,
  updatePrices: PropTypes.func.isRequired
}

export default PricesList;
