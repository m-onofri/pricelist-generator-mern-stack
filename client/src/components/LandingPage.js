import React from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

const LandingPage = () =>
<div className="landing-page">
  <h1>Price Lists Generator</h1>
  <div className="landing-page_buttons">
      <Link to="/register" className="btn btn-add">Register</Link>
      <Link to="/login" className="btn btn-add">Login</Link>
  </div>
</div>

export default LandingPage;