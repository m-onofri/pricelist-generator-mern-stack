import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import MainApp from './MainApp';
import Admin from './Admin';
import './App.css';

class App extends Component {
    state = {
        data: {},
        loaded: false
    }
    
    componentDidMount() {
        fetch("http://localhost:9000/priceList")
            .then(res => res.json())
            .then(data => {
                this.setState({
                data,
                loaded: true
            });
        });
    }

    render() {
        const {loaded, data} = this.state;
        if (loaded) {
            return(
                <Router>
                    <div>
                        <div className="nav" >
                            <NavLink exact activeClassName="active" className="link" to="/">Price Generator</NavLink>
                            <NavLink activeClassName="active" className="link" to="/admin">Admin Page</NavLink>
                        </div>
                        <Route exact path="/" render={() =>  <MainApp data={data} />} />
                        <Route path="/admin" render={(props) => <Admin
                                                                    match={props.match}
                                                                    data={data}             
                                                                />} />
                    </div>
                </Router>
            );
        } else {
            return "Wait...";
        }   
        
    }
}

export default App;