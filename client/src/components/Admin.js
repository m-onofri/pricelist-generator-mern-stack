import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminCreate from './admin/AdminCreate';
import AdminUpdate from './admin/AdminUpdate';
import {getCurrentPricelist} from '../actions/pricelist';

const Admin = ({admin}) => 
    
    <Router>
        <div>
            <div id="first_section">
                <div className="admin-nav">
                    <NavLink exact activeClassName="active-bis" className="link-bis" to="/admin">Update Price Lists</NavLink>
                    <NavLink activeClassName="active-bis" className="link-bis" to="/admin/create">Create Price Lists</NavLink>
                </div>
            </div>
            <Route exact path="/admin" render={() =>  <AdminUpdate data={admin.pricelist} />}  />
            <Route path="/admin/create" component={AdminCreate} />
        </div>
    </Router>   

Admin.propTypes = {
    match: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired  
}

const mapStateToProps = state => ({
   admin: state.pricelist
});

export default connect(mapStateToProps, { getCurrentPricelist })(Admin);