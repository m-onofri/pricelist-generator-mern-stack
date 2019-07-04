import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
//import PropTypes from 'prop-types';

const Register = (props) => {
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
            props.setAlert('Passwords do not match', 'danger');
        } else {
            console.log(formData);
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={e => onSubmit(e)}>
                <label id="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={name} 
                    onChange={e => onChange(e)} 
                    required />
                <label id="email" >Email:</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={email} 
                    onChange={e => onChange(e)} 
                    required />
                <label id="password" >Password:</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    required/>
                <label id="password" >Confirm password:</label>
                <input 
                    type="password" 
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                    required/>
                <input type="submit" className="btn btn-add" />
                <Link className="btn btn-cancel" to="/">Back</Link>
            </form>
        </div>
    );
}

export default connect(null, {setAlert})(Register);