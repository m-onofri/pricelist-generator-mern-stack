import React from 'react';
import PropTypes from 'prop-types';
import { updateRoomingState } from '../../actions/pricelist';
import { connect } from 'react-redux';

const RoomingElement = ({title, id, dashboard, updateRoomingState}) => {

  const updateRooming = event => {
    const rooming = {...dashboard.rooming};
    const id = event.target.id;
    rooming[id] = parseInt(event.target.value);
    updateRoomingState(rooming);
  }

  return (
    <div className="input-block">
      <label>{title}</label>
      <input 
        type="number"
        id={id}
        value={dashboard.rooming[id]} 
        onChange={updateRooming}
        min="0"
      />
  </div>
  );
}



  

RoomingElement.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  updateRooming: PropTypes.func.isRequired 
}

const mapStateToProps = state => ({
  dashboard: state.pricelist
});

export default connect(mapStateToProps, {updateRoomingState})(RoomingElement);
