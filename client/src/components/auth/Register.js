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
        <section class="container">
            <Alert />
            <div class="access-container">
                <h1 class="large text-primary">Sign Up</h1>
                <p class="lead">
                    <i class="fas fa-user hide-sm"></i>
                    Create your account
                </p>
                <form class="form" onSubmit={e => onSubmit(e)}>
                    <div class="form-group">
                        <input 
                            type="text" 
                            placeholder="Name"
                            name="name"
                            value={name} 
                            onChange={e => onChange(e)}
                            required />
                    </div>
                    <div class="form-group">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}/>
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            minlength="6"
                            value={password}
                            onChange={e => onChange(e)}/>
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            placeholder="Confirm Password"
                            name="password2"
                            minlength="6"
                            value={password2}
                            onChange={e => onChange(e)}/>
                    </div>
                    <input 
                        type="submit" 
                        value="Register" 
                        class="btn btn-primary"/>
                </form>
                <p class="my-1">
                    Already have an account? <Link to="./login">Sign In</Link>
                </p>
            </div>
        </section>
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