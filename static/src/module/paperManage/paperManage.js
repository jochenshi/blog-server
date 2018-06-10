import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Table, Button} from 'antd'
import './paperManage.styl'

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
    }

    render() {
        return (
            <div className={'paper-manage'}>
                <div className={"button-area"}>
                    <Button type={"primary"}><Link to={"/auth/main/createPaper"}>写文章</Link></Button>
                </div>
                <Table columns={this.columns}/>
            </div>
        )
    }
}

export default PaperManage