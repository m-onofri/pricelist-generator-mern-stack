import React from 'react';
import { connect } from 'react-redux';
import InputBlockNewPeriod from './InputBlockNewPeriod';
import { addPeriod, toggleNewPeriodFormState } from '../../actions/admin';
import PropTypes from 'prop-types';

const NewPeriodColumn = ({newPeriodData, priceListId, addPeriod,toggleNewPeriodFormState}) => {

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

        return(
            <div className="column price-column">
                {fields.map((f, i) => {
                    return(
                        <InputBlockNewPeriod
                            key={i}
                            type={f.type}
                            name={f.name}
                            value={newPeriodData[f.name]}
                        />
                    )}
                )}
                <div className="input-block">
                    <a 
                        href="!#" 
                        className="btn btn-success" 
                        onClick={(e) => {
                            e.preventDefault();
                            addPeriod(newPeriodData, priceListId, undefined);
                        }}>
                    Add</a>
                </div>
                <div className="input-block">
                    <a 
                        href="!#" 
                        className="btn btn-danger" 
                        onClick={toggleNewPeriodFormState}>
                    Back</a>
                </div>
            </div>
        );
}

const mapStateToProps = state => ({
    newPeriodData: state.admin.newPeriodData,
    priceListId: state.admin.priceListId
})

NewPeriodColumn.propTypes = {
    newPeriodData: PropTypes.object.isRequired,
    priceListId: PropTypes.string.isRequired, 
    updateNewPeriodDataState: PropTypes.func.isRequired, 
    addPeriod: PropTypes.func.isRequired,
    toggleNewPeriodFormState: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addPeriod, toggleNewPeriodFormState })(NewPeriodColumn);