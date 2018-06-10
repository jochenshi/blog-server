import React, {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

class MainContent extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.path}/home`}/>
                <Redirect to={}/>
            </Switch>
        )
    }
}

export default MainContent