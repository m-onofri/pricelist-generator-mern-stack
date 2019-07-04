import React from 'react';
import PropTypes from 'prop-types';

const RoomingElement = ({title, id, value, updateRooming}) =>
<div className="rooming">
  <label>{title}</label>
  <input id={id} type="number" value={value} onChange={updateRooming}/>
</div>

RoomingElement.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateRooming: PropTypes.func.isRequired 
}

export default RoomingElement;
