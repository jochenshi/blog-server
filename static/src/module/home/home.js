import React, {Component} from 'react'
import {Switch, Route, Redirect, Link} from 'react-router-dom'

import {Layout, Menu, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;

import './home.styl'
import MainPage from "../mainPage/mainPage";
import PaperManage from "../paperManage/paperManage";
import UserManage from "../userManage/userManage";
import SystemSetting from "../setting/SystemSetting";
import CreatePaper from "../createPaper";
import OptionManage from "../optionManage";

class Home extends Component{
    constructor(props) {
        super(props);
        const selected = props.location.pathname.split('/')[3] || 'home';
        this.state = {
            selectedMenu: selected
        }
    }

    handleClick = (e) => {
        this.setState({
            selectedMenu: e.key
        });
        let newPath = this.props.match.path + "/" + e.key;
        if (this.props.location.pathname !== newPath) {
            this.props.history.push(newPath);
            console.log(this.props)
        }
    };

    /*componentDidMount(){
        const selected = this.props.location.pathname.split('/')[3] || 'home';
        this.setState({
            'selectedMenu': selected
        });
    }*/

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
                            {/*<Link to={"/auth/home"}>*/}
                                <Icon type={'home'}/>
                                <span>首页</span>
                            {/*</Link>*/}
                        </Menu.Item>
                        <Menu.Item key={"paperManage"}>
                            {/*<Link to={"/auth/paperManage"}>*/}
                                <Icon type="file-text" />
                                <span>文章管理</span>
                            {/*</Link>*/}
                        </Menu.Item>
                        <Menu.Item key={"userManage"}>
                            {/*<Link to={"/auth/userManage"}>*/}
                                <Icon type={"user"}/>
                                <span>用户管理</span>
                            {/*</Link>*/}
                        </Menu.Item>
                        <Menu.Item key={"optionManage"}>
                            {/*<Link to={"/auth/userManage"}>*/}
                            <Icon type={"profile"}/>
                            <span>选项管理</span>
                            {/*</Link>*/}
                        </Menu.Item>
                        <Menu.Item key={"setting"}>
                            {/*<Link to={"/auth/setting"}>*/}
                                <Icon type={"setting "}/>
                                <span>系统设置</span>
                            {/*</Link>*/}
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{margin: '0 30px'}}>
                        <Switch>
                            <Route path={`${this.props.match.path}/home`} component={MainPage}/>
                            <Route path={`${this.props.match.path}/paperManage`} component={PaperManage}/>
                            <Route path={`${this.props.match.path}/createPaper`} component={CreatePaper}/>
                            <Route path={`${this.props.match.path}/optionManage`} component={OptionManage}/>
                            <Route path={`${this.props.match.path}/userManage`} component={UserManage}/>
                            <Route path={`${this.props.match.path}/setting`} component={SystemSetting}/>
                            <Redirect to={`${this.props.match.path}/home`}/>
                        </Switch>
                    </Content>
                    <Footer>All rights are reserved by jochenshi</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Home