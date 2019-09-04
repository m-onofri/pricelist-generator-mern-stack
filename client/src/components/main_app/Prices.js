import React from 'react';
import PropTypes from 'prop-types';
import {updatePricesState} from '../../actions/pricelist';
import {renderDate} from '../../utils/dateUtilities';
import {connect} from 'react-redux';
import InputBlockPrices from './InputBlockPrices';

const Prices = ({days, id, value}) => {

  const daysNumber = days.length;
  const lastDay = days[daysNumber - 1] + 86400000;
  const firstDay = days[0];

  const fields = [
    {name: "ad", type: "number"}, 
    {name: "ad34", type: "number"}, 
    {name: "chd3", type: "number"},
    {name: "chd4", type: "number"}, 
    {name: "inf", type: "number"},
    {name: "culla", type: "number"}, 
    {name: "animal", type: "number"}, 
    {name: "sing", type: "number"}];

  return(
    <div className="column price-column" id={id}>
      <h3>Days: {daysNumber}</h3>
      <p>from {renderDate(firstDay)}</p>
      <p>to {renderDate(lastDay)}</p>
      {fields.map((f, i) => 
        <InputBlockPrices
          key={i}
          field={f}
          value={value[f.name]}
        />
      )}  
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
