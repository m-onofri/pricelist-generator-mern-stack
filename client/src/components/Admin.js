import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import AdminCreate from './admin/AdminCreate';
import AdminUpdate from './admin/AdminUpdate';

const Admin = ({data}) => 
    
    <Router>
        <div>
            <div id="first_section">
                <div className="admin-nav">
                    <NavLink exact activeClassName="active-bis" className="link-bis" to="/admin">Update Price Lists</NavLink>
                    <NavLink activeClassName="active-bis" className="link-bis" to="/admin/create">Create Price Lists</NavLink>
                </div>
            </div>
            <Route exact path="/admin" render={() =>  <AdminUpdate data={data} />}  />
            <Route path="/admin/create" component={AdminCreate} />
        </div>
    </Router>   

Admin.propTypes = {
    match: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired  
}

export default Admin;