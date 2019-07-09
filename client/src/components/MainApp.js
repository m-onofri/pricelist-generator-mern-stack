import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { getCurrentPricelist } from '../actions/pricelist';
import Dashboard from './Dashboard';

const MainApp = ({ pricelist, auth, getCurrentPricelist }) => {
    useEffect(() => {
        getCurrentPricelist();
    }, [getCurrentPricelist]);

    if (!pricelist.loading) { 
        return (
            <div>   
                <Dashboard data={pricelist.pricelist} />       
            </div>
        )
    } else {
        return ("Wait...");
    }
    
}
    
    
const mapStateToProps = state => ({
    auth: state.auth,
    pricelist: state.pricelist
});

export default connect(mapStateToProps, { getCurrentPricelist })(MainApp);