import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { getCurrentPricelist } from '../actions/pricelist';
import { setupAdminUpdatePage } from '../actions/admin';
import Dashboard from './Dashboard';
import PropTypes from 'prop-types';

const MainApp = ({ pricelist: {loading, pricelist}, getCurrentPricelist, setupAdminUpdatePage }) => {
    useEffect(() => {
        getCurrentPricelist();
        setupAdminUpdatePage();
    }, [getCurrentPricelist, setupAdminUpdatePage]);

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

export default connect(mapStateToProps, { getCurrentPricelist, setupAdminUpdatePage })(MainApp);