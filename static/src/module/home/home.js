import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {Layout, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;

import './home.styl'
import MainPage from "../mainPage/mainPage";
import PaperManage from "../paperManage/paperManage";
import UserManage from "../userManage/userManage";
import SystemSetting from "../setting/SystemSetting";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedMenu: "home"
        }
    }

    handleClick = (e) => {
        console.log(this.props);
        this.setState({
            selectedMenu: e.key
        })
    };

    render() {
        return (
            <Layout className={"home-layout"}>
                <Sider
                    collapsible
                    //collapsedWidth={0}
                    breakpoint={'lg'}>
                    <div className={"logo"}/>
                    <Menu
                        selectedKeys={[this.state.selectedMenu]}
                        onClick={this.handleClick}
                        theme={"dark"}
                        mode={"inline"}>
                        <Menu.Item key={"home"}>
                            <Icon type={'home'}/>
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key={"paperManage"}>
                            <Icon type="file-text" />
                            <span>文章管理</span>
                        </Menu.Item>
                        <Menu.Item key={"userManage"}>
                            <Icon type={"user"}/>
                            <span>用户管理</span>
                        </Menu.Item>
                        <Menu.Item key={"setting"}>
                            <Icon type={"setting "}/>
                            <span>系统设置</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{margin: '0 30px'}}>
                        <Switch>
                            <Route path={`${this.props.match.path}/main`} component={MainPage}/>
                            <Route path={`${this.props.match.path}/paperManage`} component={PaperManage}/>
                            <Route path={`${this.props.match.path}/userManage`} component={UserManage}/>
                            <Route path={`${this.props.match.path}/setting`} component={SystemSetting}/>
                            <Redirect to={`${this.props.match.path}/main`}/>
                        </Switch>
                    </Content>
                    <Footer>All rights are reserved by jochenshi</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Home