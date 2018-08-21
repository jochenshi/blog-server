import React, {Component} from 'react';
import {Modal, Form, Input} from 'antd';

const FormItem = Form.Item;

class CreateBlog extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {visible, onCreate, onCancel, form} = this.props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            'labelCol': {
                'span': 5
            },
            'wrapperCol': {
                'span': 14,
                'offset': 1
            }
        };
        return (
            <Modal
                title={'新建博客'}
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
                okText={'确定'}
                cancelText={'取消'}
            >
                <Form>
                    <FormItem label={'标题'} {...formItemLayout}>
                        {getFieldDecorator('title', {
                            'rules': [
                                {'required': true, 'message': '博客的标题不能为空'}
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(CreateBlog);