import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () =>
  <section className="landing">
    <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Price Quotations Generator</h1>
          <p className="lead">Create your price lists and deliver your price quotations easily</p>
          <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn">Log In</Link>
          </div>
        </div>
    </div>
  </section>

export default LandingPage;