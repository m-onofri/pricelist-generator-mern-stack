import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../Alert';
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/admin/create" />
    }

    return (
        <div className="auth-container">
            <Alert />
            <form onSubmit={e => onSubmit(e)}>
                <label id="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={name} 
                    onChange={e => onChange(e)} 
                />
                <label id="email" >Email:</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email} 
                    onChange={e => onChange(e)} 
                />
                <label id="password" >Password:</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
                <label id="password" >Confirm password:</label>
                <input 
                    type="password" 
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                />
                <input type="submit" className="btn btn-add" />
                <Link className="btn btn-cancel" to="/">Back</Link>
            </form>
        </div>
    );
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(Register);