import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

import {Table, Button, Tag, Icon, Tooltip, Divider} from 'antd';
import moment from 'moment';
import CreateBlog from './createPaper';
import EditBlogInfo from './editPaper';
import './paperManage.styl';

class PaperManage extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "文章编号",
                dataIndex: "serialNumber",
                render(text, record){
                    return record['_id']
                }
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
                dataIndex: "tag",
                render(text, record){
                    return text.length ?
                        text.map(val => <Tag color={'blue'} key={val}>{val}</Tag>) :
                        '--';
                }
            },
            {
                title: "分类",
                dataIndex: "category",
                render(text, record){
                    console.log(text);
                    const arr = record['category'].map(val => val.category);
                    return arr.join();
                }
            },
            {
                title: "创建日期",
                dataIndex: "createTime",
                render(text, record){
                    const temp = moment(record['createdAt']).format('YYYY-MM-DD HH:mm:ss');
                    console.log(temp);
                    return temp;
                }
            },
            {
                title: "最近更新时间",
                dataIndex: "updateTime",
                render(text, record){
                    const temp = moment(record['updatedAt']).format('YYYY-MM-DD HH:mm:ss');
                    return temp;
                }
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={() => {
                                this.props.history.push('/auth/main/createPaper/' + record['_id']);
                            }}
                        >
                            <Tooltip title={'编辑文章内容'}>
                                <Icon type={'edit'} />
                            </Tooltip>
                        </a>
                        <Divider type={'vertical'} />
                        <a
                            href="javascript:;"
                            onClick={() => {
                                console.log(record);
                                this.setState({
                                    'editVisible': true,
                                    'editRecord': record
                                });
                            }}
                        >
                            <Tooltip title={'编辑文章信息'}>
                                <Icon type={'profile'} />
                            </Tooltip>
                        </a>
                    </span>
                )
            }
        ];
        this.state = {
            'addVisible': false,
            'editVisible': false,
            'categoryList': [],
            'paperData': [],
            'paperTableLoading': true,
            'paperCreating': false,
            'paperEdit': false,
            'editRecord': {},
            'selectedRowKeys': []
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
                'method': 'GET'
            }).then(val => {
                this.setState({
                    'paperData': val.data || [],
                    'paperTableLoading': false
                });
            }).catch(err => {
                this.setState({
                    'paperData': [],
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
            'method': 'GET'
        }).then(val => {
            this.setState({
                'categoryList': val.data || []
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
                this.setState({
                    'paperCreating': true
                });
                console.log('Received Values:', values);
                const {title, category, tags = ''} = values;
                let finalTags = tags.length ? tags.split(',') : [];
                axios({
                    'url': '/authen/papers/',
                    'method': 'POST',
                    'data': {
                        title,
                        category,
                        'tag': finalTags
                    }
                }).then(val => {
                    this.setState({
                        'addVisible': false,
                        'paperCreating': false
                    });
                    form.resetFields();
                    this.getPaper();
                }).catch(err => {
                    this.setState({
                        'paperCreating': false
                    });
                });
            }
        });
    }

    /*
    *  处理编辑博客信息的弹出框的隐藏
    * */
    handleEditHide = () => {
        this.setState({
            'editVisible': false,
            'editRecord': {}
        });
    }

    /*
    *  处理编辑博客信息的确认的操作
    * */
    handleEditConfirm = () => {
        const form = this.editForm.props.form;
        console.log(form);
        form.validateFields((err, values) => {
            if(!err){
                this.setState({
                    'paperEdit': true
                });
                const {title, category, tags = ''} = values;
                const id = this.editForm.props.editInfo._id;
                let finalTags = tags.length ? tags.split(',') : [];
                axios({
                    'url': '/authen/papers/',
                    'method': 'PUT',
                    'data': {
                        id,
                        title,
                        category,
                        'tag': finalTags
                    }
                }).then(val => {
                    this.setState({
                        'editVisible': false,
                        'paperEdit': false
                    });
                    form.resetFields();
                    this.getPaper();
                }).catch(err => {
                    this.setState({
                        'paperEdit': false
                    });
                });
            }
        })
    }

    handleSelect = (selectedRowKeys, selectRows) => {
        this.setState({
            selectedRowKeys
        });
    }

    render() {
        const {
            addVisible, categoryList, paperData,
            paperTableLoading, paperCreating, selectedRowKeys,
            editVisible, paperEdit, editRecord} = this.state;
        const rowSelect = {
            'selectedRowKeys': selectedRowKeys,
            'onChange': this.handleSelect
        };
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
                    rowSelection={rowSelect}
                    rowKey={record => record['_id']}
                />
                <CreateBlog
                    visible={addVisible}
                    wrappedComponentRef={(formRef) => {
                        this.addForm = formRef;
                    }}
                    paperCreating={paperCreating}
                    categoryList={categoryList}
                    onCreate={this.handleAddConfirm}
                    onCancel={this.handleAddHide}
                />
                <EditBlogInfo
                    visible={editVisible}
                    wrappedComponentRef={(formRef) => {
                        this.editForm = formRef;
                    }}
                    paperEdit={paperEdit}
                    categoryList={categoryList}
                    editInfo={editRecord}
                    onConfirm={this.handleEditConfirm}
                    onCancel={this.handleEditHide}
                />
            </div>
        )
    }
}

export default PaperManage