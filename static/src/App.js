import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import axios from 'axios';
import {message} from 'antd';

import 'antd/dist/antd.css'
import '../asset/icon/iconfont.css'

import Home from "./module/home/home";
import Login from "./module/login/login";
import CreatePaper from "./module/createPaper";

const initAxios = () => {
    axios.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        console.log(error);
        if(error.response.status === 404){
            message.error('请求不存在');
        }else if(error.response.data.message){
            message.error(error.response.data.message);
        }
        return Promise.reject(error.response.data);
    })
}


class App extends Component{
    constructor(props) {
        super(props);
        initAxios();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/auth/main/createPaper/:id'} component={CreatePaper}/>
                    <Route path={'/auth/main'} component={Home}/>
                    <Route path={'/login'} component={Login}/>
                    <Redirect to={'/auth/main'}/>
                </Switch>
            </Router>
        )
    }
}

export default App