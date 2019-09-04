import React from 'react';
import PropTypes from 'prop-types';

const InputBlockCreate = ({type, name, value, addNewValuesHandler}) => 
    <div className="input-block">
        <input 
            type={type} 
            name={name}
            value={value} 
            onChange={addNewValuesHandler}
            step="0.01"/>
    </div>

InputBlockCreate.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    addNewValuesHandler: PropTypes.func.isRequired
}

export default InputBlockCreate;