import React from 'react';

const RoomingLabelColumn = () => {
    const fields = [
        {name:"periodName", type:"text", label:"Period"}, 
        {name: "start", type: "date", label:"From"}, 
        {name: "end", type: "date", label:"To"}, 
        {name: "ad", type: "number", label:"Adulti"}, 
        {name: "ad34", type: "number", label:"Ad 3-4"}, 
        {name: "chd3", type: "number", label:"Chd 3"},
        {name: "chd4", type: "number", label:"Chd 4"}, 
        {name: "inf", type: "number", label:"Infant"},
        {name: "culla", type: "number", label: "Culla"}, 
        {name: "animal", type: "number", label:"Animal"}, 
        {name: "sing", type: "number", label:"Sup. sing"}];

    return (
        <div className="column rooming-column">
            {fields.map((f, i) => <div key={i} className="input-block"><label>{f.label}</label></div>)}
        </div>
    )

}

export default RoomingLabelColumn;