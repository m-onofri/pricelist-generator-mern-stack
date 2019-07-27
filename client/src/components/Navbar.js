import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading}, logout }) => {
    const authLinks = (
        <div className="nav" >
            <NavLink exact activeClassName="active" className="link" to="/app">Price Generator</NavLink>
            <NavLink exact activeClassName="active" className="link" to="/admin">Admin Page</NavLink>
            <a  className="link" href="#!" onClick={logout}>Log Out</a>
        </div>
    );

    const guestLinks = (
        <div className="nav" >
            <NavLink exact activeClassName="active" className="link" to="/app">Price Generator</NavLink>
            <NavLink exact activeClassName="active" className="link" to="/admin">Admin Page</NavLink>
            <a  className="link" href="/login" >Log In</a>
        </div>
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