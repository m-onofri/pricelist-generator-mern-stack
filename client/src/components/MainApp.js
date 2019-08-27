import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { setupDashboard } from '../actions/pricelist';
import { setupAdminUpdatePage } from '../actions/admin';
import Dashboard from './Dashboard';
import PropTypes from 'prop-types';

const MainApp = ({ pricelist: {loading}, setupDashboard, setupAdminUpdatePage }) => {
    useEffect(() => {
        setupDashboard();
        setupAdminUpdatePage();
    }, [setupDashboard, setupAdminUpdatePage]);

    if (!loading) { 
        return (
            <div>   
                <Dashboard />       
            </div>
        )
    } else {
        return ("Wait...");
    }
}

MainApp.propTypes = {
    pricelist: PropTypes.object.isRequired,
    setupDashboard: PropTypes.func.isRequired
}
 
const mapStateToProps = state => ({
    pricelist: state.pricelist
});

export default connect(mapStateToProps, { setupDashboard, setupAdminUpdatePage })(MainApp);