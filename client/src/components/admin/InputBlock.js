import React from 'react';
import {connect} from 'react-redux';
import { valueUpdateHandlerState } from '../../actions/admin';
import PropTypes from 'prop-types';

const InputBlock = ({admin, type, name, i, value, valueUpdateHandlerState}) => {
    const isPrices = type === "number";
    return(
        <div className="input-block">
            <input 
                type={type} 
                value={value} 
                name={name}
                onChange={(e) => valueUpdateHandlerState(e, admin.periods[i], isPrices, admin)} 
                required />
        </div>
    )
}

InputBlock.propTypes = {
    admin: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
    valueUpdateHandlerState: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {valueUpdateHandlerState})(InputBlock);