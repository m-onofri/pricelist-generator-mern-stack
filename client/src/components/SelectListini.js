import React from 'react';
import PropTypes from 'prop-types';

const SelectListini = ({updatePriceList, value, priceLists, label, data}) =>
  <div className="pricelists">
    {label && <><label>Pricelists</label><br/></>}
    <div className="styled-select">
      <select
        id="listini"
        name="listini"
        onChange={event => updatePriceList(event, data)}
        value={value}>
          {priceLists.map((x, i) => <option key={i} value={x}>{x}</option>)}
      </select> 
    </div>
  </div>

SelectListini.propTypes = {
  value: PropTypes.string.isRequired,
  updatePriceList: PropTypes.func.isRequired,
  priceLists: PropTypes.array.isRequired
}

export default SelectListini;
