import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './auth/Register';
import Login from './auth/Login';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from '../store';

class AuthPage extends Component {
    render() {
        return(
            <Provider store={store}>
                <Router>
                <div>
                    <Route exact path="/" component={LandingPage} />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </div>
            </Router>
            </Provider>
        );      
    }
}

export default AuthPage;