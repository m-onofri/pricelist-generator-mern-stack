import React from 'react';
import PropTypes from 'prop-types';
import {updatePricesState} from '../../actions/pricelist';
import {renderDate} from '../../utils/dateUtilities';
import {connect} from 'react-redux';

const Prices = ({days, id, value, updatePricesState, dashboard}) => {

  const daysNumber = days.length;
  const lastDay = days[daysNumber - 1] + 86400000;
  const firstDay = days[0];

  const updatePrices = event => {
    const prices = [...dashboard.prices];
    const section = event.target.parentNode.parentNode.id;
    const id = event.target.id;
    const value = event.target.value;
    for(let i=0; i < prices.length; i++) {
      if(prices[i][0] === section) {
        prices[i][1][id] = value;
      }
    }
    updatePricesState(prices);
  }

  return(
    <div className="column price-column" id={id}>
      <h3>Days: {daysNumber}</h3>
      <p>from {renderDate(firstDay)}</p>
      <p>to {renderDate(lastDay)}</p>
      <div className="input-block">
          <input 
            type="number"
            id="ad"
            value={value.ad} 
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number"
            id="ad34"
            value={value.ad34} 
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number"
            id="chd3" 
            value={value.chd3} 
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number"
            id="chd4"
            value={value.chd4}
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number"
            id="inf"
            value={value.inf}
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number"
            id="animal"
            value={value.animal}
            onChange={updatePrices}/>
      </div>
      <div className="input-block">
          <input 
            type="number" 
            id="culla"
            value={value.culla} 
            onChange={updatePrices}
            />
      </div>
      <div className="input-block">
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
  updatePricesState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  dashboard: state.pricelist
});

export default connect(mapStateToProps, {updatePricesState})(Prices);
