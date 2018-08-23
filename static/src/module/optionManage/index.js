import React, {Component} from 'react';
import {Tabs} from 'antd';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import MainPage from "../mainPage/mainPage";
import TagPage from "./tagPage";
import CategoryPage from "./category";

const TabPane = Tabs.TabPane;

class OptionManage extends Component {
    constructor(props) {
        super(props);
        const active = this.getInitTab(props);
        this.state = {
            'activeTab': active
        };
    }

    /*
    *  初始化进入界面的时候获取当前激活的tab
    * */
    getInitTab(props = {}){
        const {pathname = ''} = props.location || {};
        return ['tag', 'category'].indexOf(pathname.split('/')[4]) > -1 ?
            pathname.split('/')[4] : 'tag';
    }

    /*
    *  处理点击Tab的切换
    * */
    handleTabChange = (key) => {
        let newPath = this.props.match.path + "/" + key;
        if (this.props.location.pathname !== newPath) {
            this.props.history.push(newPath);
        }
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={this.state.activeTab} onChange={this.handleTabChange}>
                    {/*<TabPane tab={'标签'} key={'tag'}/>*/}
                    <TabPane tab={'分类'} key={'category'}/>
                </Tabs>
                <Switch>
                    <Route path={`${this.props.match.path}/tag`} component={TagPage}/>
                    <Route path={`${this.props.match.path}/category`} component={CategoryPage}/>
                    <Redirect to={`${this.props.match.path}/category`}/>
                </Switch>
            </div>
        )
    }
}

export default OptionManage