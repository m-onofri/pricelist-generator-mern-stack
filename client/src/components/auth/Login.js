import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Alert from '../Alert';
import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "Email Address",
        password: "Password"
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login({email, password});
    }

    if (isAuthenticated) {
        return <Redirect to="/app" />
    }

    return (
        <section className="container">
            <Alert />
            <div className="access-container">
                <h1 className="my-1">Sign In</h1>
                <p>
                    <i className="fas fa-user hide-sm pr-1"></i>
                    Sign into your account
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            value={email}
                            name="email"
                            onChange={e => onChange(e)} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            value={password}
                            name="password"
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Log In"
                        className="btn btn-primary"
                    />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </section>
    );
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);