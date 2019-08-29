import React from 'react';
import Prices from './Prices';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PricesList = ({prices, days}) =>
  <>
    {prices.map(([period, pricesObj], i) => 
      <Prices
        key={i}
        days={days[i][1]}
        id={period}
        value={pricesObj}
      />
    )}
  </>

PricesList.propTypes = {
  prices: PropTypes.array.isRequired,
  days: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  prices: state.pricelist.prices,
  days: state.pricelist.days
});

export default connect(mapStateToProps)(PricesList);
