import React from 'react';
import { connect } from 'react-redux';
import { dateValue } from '../../utils/dateUtilities';
import { addPeriod, deletePeriod } from '../../actions/admin';
import InputBlock from './InputBlock';
import PropTypes from 'prop-types';

const AdminPricelistColumn = ({ admin, addPeriod, deletePeriod }) => {

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
        {name: "sing", type: "number"}
    ];

    const submitHandler = (event, periodId) => {
        event.preventDefault();
        const period = Object.values(admin.data[admin.priceList]).filter(p => p._id === periodId)[0];
        const updatedPeriod = {};
        fields.forEach(field => {
            if(period[field.name]) {
                updatedPeriod[field.name] = period[field.name]; 
            } else {
                updatedPeriod[field.name] = period.prices[field.name]; 
            }
        });
        
        addPeriod(updatedPeriod, admin.priceListId, periodId);
    }

    const inputValue = (periodData, field) => {
        if (field.type === "date") {
            return dateValue(periodData[field.name]);
        } else if (field.type === "number") {
            return periodData.prices[field.name];
        } else {
            return periodData[field.name];
        }
    }

    const { priceList, data, priceListId } = admin;
    const priceListPeriods = Object.values(data[priceList]);    
    const pricelistColumn = priceListPeriods
        .filter(v => typeof v !== "string")
        .map((p, indexP) => {
            return (
                <div key={indexP} className="column price-column">
                    {fields.map((f, indexF) => 
                        <InputBlock
                            key={indexF}
                            type={f.type}
                            value={inputValue(p, f)}
                            name={f.name}
                            i={indexP}
                        />
                    )}
                <div className="input-block">
                    <a href="!#" className="btn btn-primary" id={p._id} onClick={(e) => submitHandler(e, p._id)}>Update</a>
                </div>
                <div className="input-block">
                    <a 
                        href="!#" 
                        className="btn btn-danger" 
                        onClick={(e) => {
                            e.preventDefault();
                            deletePeriod(p._id, priceListId);
                        }}>
                    Delete</a>
                </div>
            </div>
            );
        });

    return <>{pricelistColumn}</>
}

const mapStateToProps = state => ({
    admin: state.admin
 });

 AdminPricelistColumn.propTypes = {
    admin: PropTypes.object.isRequired,
    addPeriod: PropTypes.func.isRequired, 
    deletePeriod: PropTypes.func.isRequired
 }

export default connect(mapStateToProps, {addPeriod, deletePeriod})(AdminPricelistColumn);
