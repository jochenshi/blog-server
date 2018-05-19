import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from "./module/home/home";
import Login from "./module/login/login";



class App extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/auth/home'} component={Home}/>
                    <Route path={'/login'} component={Login}/>
                    <Redirect to={'/auth/home'}/>
                </Switch>
            </Router>
        )
    }
}

export default App