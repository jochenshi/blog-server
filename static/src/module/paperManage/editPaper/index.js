import React, {Component} from 'react';
import {Modal, Form, Input, Select, Tooltip, Icon} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class EditBlog extends Component{
    constructor(props){
        super(props);
    }

    handleCancel = () => {
        const {form, onCancel} = this.props;
        form.resetFields();
        onCancel();
    };

    render(){
        const {visible, onConfirm, form, categoryList, loading, editInfo = {}} = this.props;
        const {category = [], tag = [], title} = editInfo;
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
                title={'编辑博客'}
                visible={visible}
                onOk={onConfirm}
                onCancel={this.handleCancel}
                okText={'确定'}
                cancelText={'取消'}
                confirmLoading={loading}
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
                    <FormItem label={'分类'} {...formItemLayout}>
                        {getFieldDecorator('category', {
                            'rules': [
                                {'required': true, 'message': '请选择博客的分类'}
                            ]
                        })(
                            <Select mode={'multiple'}>
                                {(categoryList || []).map((val, index) => {
                                    return (
                                        <Option key={val['_id']}>{val.category}</Option>
                                    )
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={(
                        <span>
                            标签&nbsp;
                            <Tooltip title={'输入多个标签时请以英文格式的逗号作为分隔'}>
                                <Icon type={'question-circle-o'} />
                            </Tooltip>
                        </span>
                    )} {...formItemLayout}>
                        {getFieldDecorator('tags')(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({
    mapPropsToFields(props){
        const {category = [], tag = [], title} = props.editInfo || {};
        console.log('ca', category);
        return {
            'title': Form.createFormField({
                'value': title || ''
            }),
            'category': Form.createFormField({
                'value': category.length ? category.map(val => val['_id']) : []
            }),
            'tags': Form.createFormField({
                'value': tag.length ? tag.join() : ''
            })
        }
    }
})(EditBlog);