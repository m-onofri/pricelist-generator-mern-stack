import React, {useState} from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });

    const { name, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
    }

    return (
        <div className="auth-container">
            <form onSubmit={e => onSubmit(e)}>
                <label id="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    name="name"
                    onChange={e => onChange(e)} 
                    required />
                <label id="password" >Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    password="password"
                    onChange={e => onChange(e)}
                    required />
                <input type="submit" className="btn btn-add" />
                <Link className="btn btn-cancel" to="/">Back</Link>
            </form>
        </div>
    );
}
    

export default Login;