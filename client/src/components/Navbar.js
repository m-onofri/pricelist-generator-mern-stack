import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading}, logout }) => {
    const authLinks = (
        <nav class="navbar bg-dark">
            <h1>
                <a href="/app">
                    PQGenerator
                </a>
            </h1>
            <ul>
                <li><Link to="/app">Dashboard</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><a href="#!" onClick={logout}>Log Out</a></li>
            </ul>
        </nav>
    );

    const guestLinks = (
        <nav class="navbar bg-dark">
            <h1>
                <a href="/app">
                    PQGenerator
                </a>
            </h1>
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );

    return (
        <div>
            { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </div>
    );
}
    
Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);