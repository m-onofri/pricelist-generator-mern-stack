import React from 'react';
import PropTypes from 'prop-types';

const SelectListini = ({updatePriceList, value, priceLists, label}) =>
  <div class="pricelists">
    {label && <><label for="pricelist">Pricelists</label><br/></>}
    <div class="styled-select">
      <select
        id="listini"
        name="listini"
        onChange={updatePriceList}
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
