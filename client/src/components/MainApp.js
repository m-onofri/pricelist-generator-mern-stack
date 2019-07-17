import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { getCurrentPricelist } from '../actions/pricelist';
import Dashboard from './Dashboard';
import PropTypes from 'prop-types';

const MainApp = ({ pricelist: {loading, pricelist}, getCurrentPricelist }) => {
    useEffect(() => {
        getCurrentPricelist();
    }, [getCurrentPricelist]);

    if (!loading) { 
        return (
            <div>   
                <Dashboard data={pricelist} />       
            </div>
        )
    } else {
        return ("Wait...");
    }
}

MainApp.propTypes = {
    pricelist: PropTypes.object.isRequired,
    getCurrentPricelist: PropTypes.func.isRequired
}
 
const mapStateToProps = state => ({
    pricelist: state.pricelist
});

export default connect(mapStateToProps, { getCurrentPricelist })(MainApp);