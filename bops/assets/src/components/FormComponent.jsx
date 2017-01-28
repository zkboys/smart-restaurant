import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';

const createForm = Form.create;
const FormItem = Form.Item;

class FormComponent extends Component {

    static defaultProps = {
        width: '100%',
        showButtons: true,
        onSubmit() {
        },
        onChange() {
        },
        onReset() {
        },
        formItemLayout: {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        },
    }

    static propTypes = {}

    componentWillReceiveProps(nextProps) {
        // 为了使撤销，tree和from能够同步
        const currentData = this.props.data;
        const nextData = nextProps.data;
        if (!currentData || !nextData) return;
        const {setFieldsValue} = this.props.form;
        const valueKeys = Object.keys(currentData);
        valueKeys.forEach(vk => {
            if (currentData[vk] !== nextData[vk]) {
                setFieldsValue({
                    [vk]: nextData[vk],
                });
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit, form: {validateFields}} = this.props;
        validateFields((errors, values) => {
            if (errors) {
                return;
            }
            if (onSubmit) {
                onSubmit(values);
            }
            this.handleReset();
        });
    };

    handleReset = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.props.form.resetFields();
    }
    handleChange = () => {
        const {onChange, form: {validateFields}} = this.props;
        if (onChange) {
            setTimeout(() => {
                validateFields((errors, values) => {
                    if (errors) {
                        return;
                    }
                    if (onChange) {
                        onChange(values);
                    }
                });
            }, 0);
        }
    };

    componentWillMount() {
        const {data, formItems}  = this.props;

        /*
         item 属性
         {
         field: 'name',
         label: '用户名',
         hasFeedback: true,
         fieldType: 'input', // TODO 后期用到再扩展，默认为input
         fieldDecorator: {
         initialValue: data[this.field],
         rules: [
         {required: true, message: `${this.label}不能为空`},
         ],
         },
         },
         */

        formItems.forEach(item => {

            if (!item.fieldType) {
                item.fieldType = 'input';
            }
            if (item.hasFeedback === undefined) {
                item.hasFeedback = true;

            }
            if (!item.placeholder) {
                if (item.fieldType === 'input') {
                    item.placeholder = `请输入${item.label}`
                }
            }

            if (!item.fieldDecorator) {
                item.fieldDecorator = {
                    initialValue: data ? data[item.field] : '',
                    rules: [
                        {required: true, message: `${item.label}不能为空`},
                    ],
                }
            }

        });

        this.formItems = formItems;
    }

    render() {
        let {form: {getFieldDecorator}, width, showButtons, formItemLayout} = this.props;

        const formItems = this.formItems.map(item => {
            const label = `${item.label}：`;
            const fieldType = item.fieldType;
            const hasFeedback = item.hasFeedback;
            const placeholder = item.placeholder;
            if (fieldType === 'input') {
                return (
                    <FormItem
                        key={item.field}
                        {...formItemLayout}
                        label={label}
                        hasFeedback={hasFeedback}
                    >
                        {getFieldDecorator(item.field, item.fieldDecorator)(
                            <Input placeholder={placeholder}/>
                        )}
                    </FormItem>
                );
            }
        });

        return (
            <Form horizontal onSubmit={this.handleSubmit} onReset={this.handleReset} style={{width}}>
                {formItems}
                {
                    showButtons ?
                        <FormItem wrapperCol={{offset: formItemLayout.labelCol.span}}>
                            <Button type="ghost" style={{marginRight: 8}} htmlType="reset">重置</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </FormItem>
                        :
                        null
                }
            </Form>
        );
    }
}

export default createForm()(FormComponent);
