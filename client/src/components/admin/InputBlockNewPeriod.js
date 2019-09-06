import React from 'react';
import {connect} from 'react-redux';
import { updateNewPeriodDataState } from '../../actions/admin';
import PropTypes from 'prop-types';

const InputBlockNewPeriod = ({type, name, value, updateNewPeriodDataState}) => {
    return(
        <div className="input-block">
            <input 
                type={type}
                value={value}
                name={name}
                onChange={updateNewPeriodDataState}
                required />
        </div>
    )
}

InputBlockNewPeriod.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updateNewPeriodDataState: PropTypes.func.isRequired
}

export default connect(null, {updateNewPeriodDataState})(InputBlockNewPeriod);