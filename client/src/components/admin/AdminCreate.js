import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {createPricelist, getCurrentPricelist} from '../../actions/pricelist';
import {register} from '../../actions/auth';
import Periods from './Periods';
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
        const name = e.target.value;
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

    const buttonClickHandler = () => {
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
        setCreateData({...createData, priceList});
    }

    const addNewValuesHandler = event => {
        const priceList = [...createData.priceList];
        const section = event.target.parentNode.id.split('-')[1];
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
        createPricelist(createData.priceList, history);
    }

    const {loaded, name, periods} = createData;
    if (loaded) {
        return(
            <div id="admin_section">
                <h2 className="center">Create Price Lists</h2>
                <div className="selector">
                    <div className="priceList-name">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => priceListNameHandler(e)}/>
                    </div>
                    <div className="priceList-name">
                        <label>Periods</label>
                        <input type="number" value={periods} onChange={(e) => priceListPeriodsHandler(e)}/>
                    </div>
                    <button onClick={buttonClickHandler}>Go!</button>
                </div>
                <div className="container">
                    <div className="header">
                        <p>Name</p>
                        <p>Period</p>
                        <p>Start</p>
                        <p>End</p>
                        <p>ad</p>
                        <p>ad34</p>
                        <p>chd3</p>
                        <p>chd4</p>
                        <p>Infant</p>
                        <p>Cot</p>
                        <p>Animal</p>
                        <p>Single room</p>
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
                <form onSubmit={(e) => submitHandler(e)}>
                    <input type="submit" className="btn btn-add createNewPlaylist" value={"Go!"}/>
                </form>
                
            </div>
        );  
    } else {
        return "Wait...";
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
