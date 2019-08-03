import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentPricelist } from '../actions/pricelist';
import AdminCreate from './admin/AdminCreate';
import AdminUpdate from './admin/AdminUpdate';
import Alert from './Alert';

const Admin = ({admin, getCurrentPricelist}) => {
    useEffect(() => {
        getCurrentPricelist();
    }, [getCurrentPricelist]);

    if (!admin.loading) { 
        return (
            <Router>
                <div>
                    <div className="admin-navbar bg-dark">
                        <Link exact to="/admin">Update Price Lists</Link>
                        <Link to="/admin/create">Create Price Lists</Link>
                    </div>
                    <Alert />
                    <Route exact path="/admin" render={() =>  <AdminUpdate data={admin.pricelist} />}  />
                    <Route path="/admin/create" component={AdminCreate} />
                </div>
            </Router>  
        )
    } else {
        return ("Wait...");
    }
}

Admin.propTypes = {
    admin: PropTypes.object.isRequired,
    getCurrentPricelist: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   admin: state.pricelist
});

export default connect(mapStateToProps, {getCurrentPricelist})(Admin);