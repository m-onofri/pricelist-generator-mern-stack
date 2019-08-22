import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import AdminCreate from './admin/AdminCreate';
import AdminUpdate from './admin/AdminUpdate';
import Alert from './Alert';

const Admin = () => (
            <Router>
                <div>
                    <div className="admin-navbar bg-dark">
                        <Link exact to="/admin">Update Price Lists</Link>
                        <Link to="/admin/create">Create Price Lists</Link>
                    </div>
                    <Alert />
                    <Route exact path="/admin" component = {AdminUpdate} />}  />
                    <Route path="/admin/create" component={AdminCreate} />
                </div>
            </Router>  
        );

export default Admin;