import React from 'react';
import {connect} from 'react-redux';
import { valueUpdateHandlerState } from '../../actions/admin';

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

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {valueUpdateHandlerState})(InputBlock);