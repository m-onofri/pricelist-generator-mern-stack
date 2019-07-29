import React from 'react';
import PropTypes from 'prop-types';

const RoomingElement = ({title, id, value, updateRooming}) =>
  <div class="input-block">
    <label for="">{title}</label>
    <input 
    type="number"
    id={id}
    value={value} 
    onChange={updateRooming}
    />
  </div>

RoomingElement.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateRooming: PropTypes.func.isRequired 
}

export default RoomingElement;
