import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createPricelist, getCurrentPricelist} from '../../actions/pricelist';
import {register} from '../../actions/auth';
import Periods from './Periods';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';

const AdminCreate = ({createPricelist, history}) => {
    const [createData, setCreateData] = useState({
        priceList: [],
        name: "new price list",
        periods: 1,
        success: true,
        message: "",
        loaded: true
    })

    const priceListNameHandler = e => {
        const name = e.target.value.toUpperCase();
        setCreateData({...createData, name});
    }

    const priceListPeriodsHandler = e => {
        const periods = parseInt(e.target.value);
        setCreateData({...createData, periods});
    }

    //value: integer
    const twoIntString = value => {
        let stringValue = value.toString();
        if (stringValue.length < 2) stringValue = `0${stringValue}`;
        return stringValue;
    }

    const buttonClickHandler = (event) => {
        event.preventDefault();
        let priceList = [];
        const {periods, name} = createData;
        const todayDate = new Date();
        const todayString = `${todayDate.getFullYear()}-${twoIntString(todayDate.getMonth() + 1)}-${twoIntString(todayDate.getDate())}`;
        for (let j = 0; j < periods; j++) {
            const periodName = String.fromCharCode(97 + j);
            priceList.push([periodName, {
                name: name,
                periodName: periodName,
                start: todayString,
                end: todayString,
                ad: "0",
                ad34: "0",
                chd3: "0",
                chd4: "0",
                inf: "0",
                animal: "5",
                culla: "10",
                sing: "14"}]);
        }
        console.log(priceList);
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

    const submitHandler = e => {
        e.preventDefault();
        console.log(createData.priceList);
        createPricelist(createData.priceList, history);
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
                                onChange={(e) => priceListNameHandler(e)}/>
                        </div>
                        <div className="period-number">
                            <label>Number</label><br/>
                            <input 
                                type="number"
                                className="styled-input"
                                value={periods} 
                                onChange={(e) => priceListPeriodsHandler(e)}/>
                        </div>
                        <a 
                            href="!#"
                            style={{"margin-top": '1.2rem'}}
                            className="btn btn-primary btn-long"
                            onClick={buttonClickHandler}
                            >Setup New Pricelist</a>
                    </div>
                    <div className="admin-create-prices_columns my-1">
                        <div className="column rooming-column">
                            <div className="input-block">
                                <label>Period</label>
                            </div>
                            <div className="input-block">
                                <label>From</label>
                            </div>
                            <div className="input-block">
                                <label>To</label>
                            </div>
                            <div className="input-block">
                                <label>Adulti</label>
                            </div>
                            <div className="input-block">
                                <label>Ad 3-4</label>
                            </div>
                            <div className="input-block">
                                <label>Chd 3</label>
                            </div>
                            <div className="input-block">
                                <label>Chd 4</label>
                            </div>
                            <div className="input-block">
                                <label>Infant</label>
                            </div>
                            <div className="input-block">
                                <label>Culla</label>
                            </div>
                            <div className="input-block">
                                <label>Animal</label>
                            </div>
                            <div className="input-block">
                                <label>Sup. sing</label>
                            </div>
                        </div>
                        {createData.priceList.map( (item, index) => {
                            return(<Periods
                                    key={index} 
                                    index={item[0]}
                                    data={item[1]}
                                    addNewValuesHandler={addNewValuesHandler}/>
                            );
                        })}
                    </div>
                    <a href="!#" class="btn btn-primary my-2" onClick={(e) => submitHandler(e)}>Create Pricelist</a> 
                </div>
            </section>
        );  
    } else {
        return <Spinner />;
    }
}

const mapStateToProps = state => ({
    message: state.pricelist.message
});

AdminCreate.propTypes = {
    message: PropTypes.object.isRequired,
    createPricelist: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {createPricelist, getCurrentPricelist, register})(withRouter(AdminCreate));
