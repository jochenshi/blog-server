import React, {Component} from 'react'
import {Link} from 'react-router-dom'

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
            'addVisible': false
        };
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
            if(err) {
                return;
            }
            console.log('Received Values:', values);
        });
    }

    render() {
        const {addVisible} = this.state;
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
                    {/*<Button type={"primary"}><Link to={"/auth/main/createPaper"}>写文章</Link></Button>*/}
                </div>
                <Table columns={this.columns}/>
                <CreateBlog
                    visible={addVisible}
                    wrappedComponentRef={(formRef) => {
                        this.addForm = formRef;
                    }}
                    onCreate={this.handleAddConfirm}
                    onCancel={this.handleAddHide}
                />
            </div>
        )
    }
}

export default PaperManage