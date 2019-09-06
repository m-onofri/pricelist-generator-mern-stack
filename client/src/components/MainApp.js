import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { setupDashboard } from '../actions/pricelist';
import Dashboard from './Dashboard';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const MainApp = ({ pricelist: {loading}, setupDashboard}) => {
    useEffect(() => {
        setupDashboard();
    }, [setupDashboard]);

    if (!loading) { 
        return (
            <div>   
                <Dashboard />       
            </div>
        )
    } else {
        return <Spinner />;
    }
}

MainApp.propTypes = {
    pricelist: PropTypes.object.isRequired,
    setupDashboard: PropTypes.func.isRequired
}
 
const mapStateToProps = state => ({
    pricelist: state.pricelist
});

export default connect(mapStateToProps, { setupDashboard })(MainApp);