import React from 'react';
import RoomingElement from './RoomingElement';
import PropTypes from 'prop-types';

const Rooming = ({value, updateRooming}) =>
  <div class="column rooming-column">
    <h3>Rooming</h3>
    <RoomingElement title="Adulti" id="ad" value={value.ad} updateRooming={updateRooming}/>
    <RoomingElement title="Ad 3-4" id="ad34" value={value.ad34} updateRooming={updateRooming}/>
    <RoomingElement title="Chd 3" id="chd3" value={value.chd3} updateRooming={updateRooming}/>
    <RoomingElement title="chd 4" id="chd4" value={value.chd4} updateRooming={updateRooming}/>
    <RoomingElement title="Infant" id="inf" value={value.inf} updateRooming={updateRooming}/>
    <RoomingElement title="Animal" id="animal" value={value.animal} updateRooming={updateRooming}/>
    <RoomingElement title="Culla" id="culla" value={value.culla} updateRooming={updateRooming}/>
    <RoomingElement title="Sup. sing" id="sing" value={value.sing} updateRooming={updateRooming}/>
  </div>

Rooming.propTypes = {
  value: PropTypes.object.isRequired,
  updateRooming: PropTypes.func.isRequired
}

export default Rooming;
