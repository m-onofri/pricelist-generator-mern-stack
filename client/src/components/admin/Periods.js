import React from 'react';
import PropTypes from 'prop-types';
import InputBlockCreate from './InputBlockCreate';

const Periods = ({index, data, addNewValuesHandler}) => {

    const fields = [
        {name:"periodName", type:"text"}, 
        {name: "start", type: "date"}, 
        {name: "end", type: "date"}, 
        {name: "ad", type: "number"}, 
        {name: "ad34", type: "number"}, 
        {name: "chd3", type: "number"},
        {name: "chd4", type: "number"}, 
        {name: "inf", type: "number"},
        {name: "culla", type: "number"}, 
        {name: "animal", type: "number"}, 
        {name: "sing", type: "number"}];

    return (
        <div className="column price-column" id={`period-${index}`}>

            {fields.map((f, i) => {
                return(
                    <InputBlockCreate 
                        key={i}
                        type={f.type}
                        name={f.name}
                        value={data[f.name]}
                        addNewValuesHandler={addNewValuesHandler}
                    />
                )
            })}
            
        </div>
    );
}

Periods.propTypes = {
    index: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    addNewValuesHandler: PropTypes.func.isRequired
}

export default Periods;