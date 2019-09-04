import React from 'react';
import {connect} from 'react-redux';
import { updateNewPeriodDataState } from '../../actions/admin';

const InputBlockNewPeriod = ({admin, type, name, i, value, updateNewPeriodDataState}) => {
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

const mapStateToProps = state => ({
    admin: state.admin
})

export default connect(mapStateToProps, {updateNewPeriodDataState})(InputBlockNewPeriod);