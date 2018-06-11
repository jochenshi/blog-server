import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import 'antd/dist/antd.css'
import '../asset/icon/iconfont.css'

import Home from "./module/home/home";
import Login from "./module/login/login";
import CreatePaper from "./module/createPaper";



class App extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/auth/main/createPaper'} component={CreatePaper}/>
                    <Route path={'/auth/main'} component={Home}/>
                    <Route path={'/login'} component={Login}/>
                    <Redirect to={'/auth/main'}/>
                </Switch>
            </Router>
        )
    }
}

export default App