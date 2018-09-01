import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class AddCategoryModal extends Component{
    constructor(props){
        super(props);
    }

    /*
    *  处理点击取消的操作
    * */
    handleCancel = () => {
        const {onCancel, form} = this.props;
        form.resetFields();
        if(typeof onCancel === "function") {
            onCancel();
        }
    }

    render() {
        const {form, modalVisible, onConfirm, confirmStatus} = this.props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            'labelCol': {
                'span': 4
            },
            'wrapperCol': {
                'span': 18
            }
        };
        return (
            <Modal
                title={'新建分类'}
                visible={modalVisible}
                okText={'确定'}
                cancelText={'取消'}
                onOk={onConfirm}
                onCancel={this.handleCancel}
                confirmLoading={confirmStatus}
                maskClosable={false}
            >
                <Form>
                    <FormItem
                        label={'类别'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('category', {
                            'rules': [
                                {'required': true, 'message': '请输入类别'}
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>
                    {/*<FormItem
                        label={'值'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('value', {
                            'rules': [
                                {'required': true, 'message': '请输入值'}
                            ]
                        })(
                            <Input />
                        )}
                    </FormItem>*/}
                    <FormItem
                        label={'描述'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description')(
                            <TextArea />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const WrappedAddCategoryModal = Form.create()(AddCategoryModal);

export default WrappedAddCategoryModal;