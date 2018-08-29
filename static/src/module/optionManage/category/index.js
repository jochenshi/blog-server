import React, {Component} from 'react';
import {Table, Button} from 'antd';
import AddCategoryModal from './component/addCatedoryModal';
import axios from 'axios';

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
            'selectedRowKeys': [],
            'addModalVisible': false,
            'loading': true,
            'confirming': false
        };
    }

    componentDidMount(){
        this.handleGetCategory();
    }

    /*
    *  获取分类的方法
    * */
    handleGetCategory = () => {
        this.setState({
            'loading': true,
        });
        axios({
            'method': 'GET',
            'url': '/authen/category'
        }).then(val => {
            this.setState({
                'tableData': val.data.data,
                'loading': false,
            })
        }).catch(err => {
            this.setState({
                'loading': false,
            });
        });
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
                this.setState({
                    'confirming': true
                });
                axios({
                    'method': 'POST',
                    'url': '/authen/category',
                    'data': value
                }).then(response => {
                    console.log(response);
                    this.setState({
                        'confirming': false,
                        'addModalVisible': false
                    });
                    this.handleGetCategory();
                }).catch(err => {
                    console.log(err);
                    this.setState({
                        'confirming': false
                    });
                })
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

    onSelectChange = (selected) => {
        console.log(selected);
        this.setState({
            'selectedRowKeys': selected
        });
    }

    render() {
        const {tableData, selectedRowKeys, addModalVisible, loading, confirming} = this.state;
        const rowSelection = {
            selectedRowKeys,
            'onChange': this.onSelectChange
        };
        return (
            <div className={'category-content'}>
                <div className={'btn-area'}>
                    <Button
                        type={'primary'}
                        onClick={this.handleGetCategory}
                        disabled={loading}
                    >
                        {loading ? '获取中' : '刷新'}
                    </Button>
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
                    rowSelection={rowSelection}
                />
                <AddCategoryModal
                    modalVisible={addModalVisible}
                    onCancel={this.handleAddVisible}
                    onConfirm={this.handleAddConfirm}
                    confirmStatus={confirming}
                    wrappedComponentRef={(val) => {this.addCategoryRef = val;}}
                />
            </div>
        )
    }
}

export default CategoryPage