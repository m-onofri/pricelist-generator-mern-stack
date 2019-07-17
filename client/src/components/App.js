import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './auth/Register';
import Login from './auth/Login';
import Navbar from './Navbar';
import MainApp from './MainApp';
import PrivateRoute from './routing/PrivateRoute';
import Admin from './Admin';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return(
        <Provider store={store}>
            <Router>
            <div>
                <Navbar />
                <Route exact path="/" component={LandingPage} />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/app" component={MainApp} />
                    <PrivateRoute exact path="/admin" component= {Admin}/>
                </Switch>
            </div>
        </Router>
        </Provider>
    )    
}

export default App;