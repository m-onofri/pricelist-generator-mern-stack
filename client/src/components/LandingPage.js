import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () =>
  <section class="landing">
    <div class="dark-overlay">
        <div class="landing-inner">
            <h1 class="x-large">Price Quotations Generator</h1>
            <p class="lead">Create your price lists and deliver your price quotations easily</p>
            <div class="buttons">
                <Link to="/register" class="btn btn-primary">Sign Up</Link>
                <Link to="/login" class="btn">Log In</Link>
            </div>
        </div>
    </div>
  </section>

export default LandingPage;