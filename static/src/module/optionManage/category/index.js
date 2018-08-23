import React, {Component} from 'react';
import {Table, Button} from 'antd';
import AddCategoryModal from './component/addCatedoryModal'

import './style.styl';

const columns = [
    {
        'title': '类别',
        'dataIndex': 'category'
    },
    {
        'title': '值',
        'dataIndex': 'value'
    },
    {
        'title': '描述',
        'dataIndex': 'description'
    }
];

class CategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'tableData': [],
            'addModalVisible': false,
            'loading': false
        }
    }

    /*
    *  处理添加分类确认的方法
    * */
    handleAddConfirm = () => {
        this.addCategoryRef.props.form.validateFields((err, value) => {
            if(err) {
                console.log(err);
            } else {
                console.log(value);
            }
        });
    }

    /*
    *  处理添加类别的弹框的显示
    * */
    handleAddVisible = () => {
        this.setState({
            'addModalVisible': !this.state.addModalVisible
        });
    }

    render() {
        const {tableData, addModalVisible, loading} = this.state;
        return (
            <div className={'category-content'}>
                <div className={'btn-area'}>
                    <Button
                        type={'primary'}
                        onClick={this.handleAddVisible}
                    >
                        创建
                    </Button>
                </div>
                <Table
                    dataSource={tableData}
                    columns={columns}
                    loading={loading}
                />
                <AddCategoryModal
                    modalVisible={addModalVisible}
                    onCancel={this.handleAddVisible}
                    onConfirm={this.handleAddConfirm}
                    wrappedComponentRef={(val) => {this.addCategoryRef = val;}}
                />
            </div>
        )
    }
}

export default CategoryPage