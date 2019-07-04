import React from 'react';
import RoomingElement from './RoomingElement';
import PropTypes from 'prop-types';

const Rooming = ({value, updateRooming}) =>
  <div className="list">
    <p style={{textAlign: "center"}}>Rooming</p>
    <p>______________________</p>
    <p>______________________</p>
    <RoomingElement title="adulti" id="ad" value={value.ad} updateRooming={updateRooming}/>
    <RoomingElement title="adulti 3-4 letto" id="ad34" value={value.ad34} updateRooming={updateRooming}/>
    <RoomingElement title="chd 3 letto" id="chd3" value={value.chd3} updateRooming={updateRooming}/>
    <RoomingElement title="chd 4 letto" id="chd4" value={value.chd4} updateRooming={updateRooming}/>
    <RoomingElement title="infant" id="inf" value={value.inf} updateRooming={updateRooming}/>
    <RoomingElement title="animal" id="animal" value={value.animal} updateRooming={updateRooming}/>
    <RoomingElement title="culla" id="culla" value={value.culla} updateRooming={updateRooming}/>
    <RoomingElement title="supp. singola" id="sing" value={value.sing} updateRooming={updateRooming}/>
  </div>

Rooming.propTypes = {
  value: PropTypes.object.isRequired,
  updateRooming: PropTypes.func.isRequired
}

export default Rooming;
