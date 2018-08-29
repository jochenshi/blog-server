import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

import {Table, Button} from 'antd';
import CreateBlog from './createPaper';
import './paperManage.styl';

class PaperManage extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "文章编号",
                dataIndex: "serialNumber"
            },
            {
                title: "文章标题",
                dataIndex: "title"
            },
            {
                title: "文章内容",
                dataIndex: "content"
            },
            {
                title: "标签",
                dataIndex: "tags"
            },
            {
                title: "分类",
                dataIndex: "classification"
            },
            {
                title: "创建日期",
                dataIndex: "createTime"
            }
        ];
        this.state = {
            'addVisible': false,
            'categoryList': [],
            'paperData': [],
            'paperTableLoading': true
        };
    }

    componentDidMount() {
        this.getPaper();
        this.getCategory();
    }

    /*
    *  获取文章的方法
    * */
    getPaper = () => {
        this.setState({
            'paperTableLoading': true
        }, () => {
            axios({
                'url': '/authen/papers/',
                'type': 'GET'
            }).then(val => {
                this.setState({
                    'paperData': val.data.data || [],
                    'paperTableLoading': false
                });
            });
        });
    }

    /*
    *  获取新建文章时分类的操作
    * */
    getCategory() {
        axios({
            'url': '/authen/category',
            'type': 'GET'
        }).then(val => {
            this.setState({
                'categoryList': val.data.data || []
            });
        });
    }

    /*
    *  处理新建博客的弹框的隐藏
    * */
    handleAddHide = () => {
        this.setState({
            'addVisible': false
        });
    }

    /*
    *  处理新建博客的弹框的确定操作
    * */
    handleAddConfirm = () => {
        const form = this.addForm.props.form;
        form.validateFields((err, values) => {
            if(!err) {
                console.log('Received Values:', values);
            }
        });
    }

    render() {
        const {addVisible, categoryList, paperData, paperTableLoading} = this.state;
        return (
            <div className={'paper-manage'}>
                <div className={"button-area"}>
                    <Button type={"primary"} onClick={() => {
                        this.setState({
                            'addVisible': true
                        });
                    }}>
                        新建文章
                    </Button>
                    <Button
                        type={'primary'}
                        disabled={paperTableLoading}
                        onClick={this.getPaper}
                    >
                        {paperTableLoading ? '获取中' : '刷新'}
                    </Button>
                    {/*<Button type={"primary"}><Link to={"/auth/main/createPaper"}>写文章</Link></Button>*/}
                </div>
                <Table
                    columns={this.columns}
                    dataSource={paperData}
                    loading={paperTableLoading}
                />
                <CreateBlog
                    visible={addVisible}
                    wrappedComponentRef={(formRef) => {
                        this.addForm = formRef;
                    }}
                    categoryList={categoryList}
                    onCreate={this.handleAddConfirm}
                    onCancel={this.handleAddHide}
                />
            </div>
        )
    }
}

export default PaperManage