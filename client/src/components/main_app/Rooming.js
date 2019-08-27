import React from 'react';
import RoomingElement from './RoomingElement';

const Rooming = () =>
  <div className="column rooming-column">
    <h3>Rooming</h3>
    <RoomingElement title="Adulti" id="ad" />
    <RoomingElement title="Ad 3-4" id="ad34" />
    <RoomingElement title="Chd 3" id="chd3" />
    <RoomingElement title="chd 4" id="chd4" />
    <RoomingElement title="Infant" id="inf" />
    <RoomingElement title="Animal" id="animal" />
    <RoomingElement title="Culla" id="culla" />
    <RoomingElement title="Sup. sing" id="sing" />
  </div>

export default Rooming;
