import React from 'react';
import PropTypes from 'prop-types';

const RoomingElement = ({title, id, value, updateRooming}) =>
  <div className="input-block">
    <label>{title}</label>
    <input 
    type="number"
    id={id}
    value={value} 
    onChange={updateRooming}
    min="0"
    />
  </div>

RoomingElement.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateRooming: PropTypes.func.isRequired 
}

export default RoomingElement;
