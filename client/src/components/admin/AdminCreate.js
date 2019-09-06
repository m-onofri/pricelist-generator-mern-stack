import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createPricelist} from '../../actions/admin';
import {register} from '../../actions/auth';
import {twoIntString} from '../../utils/dateUtilities';
import Periods from './Periods';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import RoomingLabelColumn from './RoomingLabelColumn';

const AdminCreate = ({createPricelist, history}) => {
    const [createData, setCreateData] = useState({
        priceList: [],
        name: "new price list",
        periods: 1,
        success: true,
        message: "",
        loaded: true
    })

    const fields = [
        {name: "ad", type: "number"}, 
        {name: "ad34", type: "number"}, 
        {name: "chd3", type: "number"},
        {name: "chd4", type: "number"}, 
        {name: "inf", type: "number"},
        {name: "culla", type: "number"}, 
        {name: "animal", type: "number"}, 
        {name: "sing", type: "number"}];

    const buttonClickHandler = event => {
        event.preventDefault();
        const priceList = [];
        const {periods, name} = createData;
        const todayDate = new Date();
        const todayString = `${todayDate.getFullYear()}-${twoIntString(todayDate.getMonth() + 1)}-${twoIntString(todayDate.getDate())}`;
        for (let j = 0; j < periods; j++) {
            const periodName = String.fromCharCode(97 + j);
            const startingObj = {
                name: name,
                periodName: periodName,
                start: todayString,
                end: todayString
            }
            fields.forEach(field => startingObj[field.name] = '0');
            priceList.push([periodName, startingObj]);
        }
        setCreateData({...createData, priceList});
    }

    const addNewValuesHandler = event => {
        const priceList = [...createData.priceList];
        const section = event.target.parentNode.parentNode.id.split('-')[1];
        const id = event.target.name;
        const value = event.target.value;
        for(let i=0; i < priceList.length; i++) {
            if (priceList[i][0] === section) {
                priceList[i][1][id] = value.toString();
            }
        }
        setCreateData({...createData, priceList});
    }

    const {loaded, name, periods} = createData;
    if (loaded) {
        return(
            <section className="container">
                <div className="admin-create">
                    <h1 className="my-1">Create Pricelist</h1>
                    <div className="admin-create-cmd my-1">
                        <div className="period-name">
                            <label>Name</label><br/>
                            <input 
                                type="text" 
                                className="styled-input"
                                value={name} 
                                onChange={(e) => {
                                    setCreateData({
                                        ...createData, 
                                        name: e.target.value.toUpperCase()
                                    });
                                }}/>
                        </div>
                        <div className="period-number">
                            <label>Number</label><br/>
                            <input 
                                type="number"
                                className="styled-input"
                                value={periods} 
                                onChange={(e) => {
                                    setCreateData({
                                        ...createData, 
                                        periods: parseInt(e.target.value)
                                    });
                                }}/>
                        </div>
                        <a 
                            href="!#"
                            style={{"marginTop": '1.2rem'}}
                            className="btn btn-primary btn-long"
                            onClick={buttonClickHandler}
                            >Setup New Pricelist</a>
                    </div>
                    <div className="admin-create-prices_columns my-1">
                        <RoomingLabelColumn />
                        {createData.priceList.map((item, index) => {
                            return( <Periods
                                        key={index} 
                                        index={item[0]}
                                        data={item[1]}
                                        addNewValuesHandler={addNewValuesHandler}/>
                            );
                        })}
                    </div>
                    <a 
                        href="!#" 
                        className="btn btn-primary my-2" 
                        onClick={(e) => {
                            e.preventDefault();
                            const priceList = createData.priceList.map(x => {
                                x[1].name = createData.name;
                                return x;
                            });
                            createPricelist(priceList, history);
                        }}
                    >Create Pricelist</a> 
                </div>
            </section>
        );  
    } else {
        return <Spinner />;
    }
}

AdminCreate.propTypes = {
    createPricelist: PropTypes.func.isRequired
}

export default connect(null, {createPricelist, register})(withRouter(AdminCreate));
