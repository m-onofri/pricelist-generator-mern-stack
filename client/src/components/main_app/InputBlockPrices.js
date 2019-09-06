import React from 'react';
import {connect} from 'react-redux';
import {updatePricesState} from '../../actions/pricelist';
import PropTypes from 'prop-types';

const InputBlockPrices = ({dashboard, updatePricesState, value, field}) => {

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

    return (
        <div className="input-block">
            <input 
                type={field.type} 
                id={field.name}
                value={value} 
                onChange={updatePrices}
            />
      </div>
    );
}

InputBlockPrices.propTypes = {
  dashboard: PropTypes.object.isRequired,
  updatePricesState: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    dashboard: state.pricelist
})

export default connect(mapStateToProps, {updatePricesState})(InputBlockPrices);