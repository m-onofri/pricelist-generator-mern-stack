import React from 'react';
import RoomingElement from './RoomingElement';

const Rooming = () => {

  const fields = [
    {name: "ad", type: "number", label:"Adulti"}, 
    {name: "ad34", type: "number", label:"Ad 3-4"}, 
    {name: "chd3", type: "number", label:"Chd 3"},
    {name: "chd4", type: "number", label:"Chd 4"}, 
    {name: "inf", type: "number", label:"Infant"},
    {name: "culla", type: "number", label: "Culla"}, 
    {name: "animal", type: "number", label:"Animal"}, 
    {name: "sing", type: "number", label:"Sup. sing"}];

  return(
    <div className="column rooming-column">
      <h3>Rooming</h3>
      {fields.map(f => <RoomingElement title={f.label} id={f.name} />)}
    </div>
  )
}

export default Rooming;
