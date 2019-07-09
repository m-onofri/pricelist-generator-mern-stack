import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
//import PropTypes from 'prop-types';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
        <div className="auth-container">
            <form onSubmit={e => onSubmit(e)}>
                <label id="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    value={email}
                    name="email"
                    onChange={e => onChange(e)} 
                    required />
                <label id="password" >Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    name="password"
                    onChange={e => onChange(e)}
                    required />
                <input type="submit" className="btn btn-add" />
                <Link className="btn btn-cancel" to="/">Back</Link>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);