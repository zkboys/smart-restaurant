import React, {Component, PropTypes} from 'react';
import {Table, Form, Input, Button, Popover, Icon} from 'antd';
import './style.less';
import PaginationComponent from '../../../components/pagination/PaginationComponent';
import QueryBar from '../../../components/QueryBar';
import Operator from '../../../components/Operator';
import FormComponent from '../../../components/FormComponent';

const FormItem = Form.Item;

class AccountList extends Component {

    state = {
        accountPopoverVisible: false,
    };

    accountColumns = [
        {title: '账号', dataIndex: 'account', key: 'account'},
        {title: '用户名', dataIndex: 'name', key: 'name'},
        {title: '品牌个数', dataIndex: 'mchCount', key: 'mchCount'},
        {title: '是否锁定', dataIndex: 'is_locked', key: 'is_locked'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        loading: false,
                        label: '编辑',
                        permission: 'mp-account-update',
                        onClick: () => alert('update'),
                    },
                    {
                        loading: false,
                        label: '删除',
                        permission: 'mp-account-delete',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                        },
                        onClick: () => alert('delete'),
                    },
                    {
                        loading: false,
                        label: '添加品牌',
                        permission: 'mp-add-mch',
                        onClick: () => alert('add mch'),
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    accountData = [
        {
            key: 1,
            name: '明日之星',
            account: 'asdfasdf@163.com,18611434363',
            mchCount: 2,
            is_locked: 1,
        },
        {
            key: 2,
            name: '哈哈',
            account: '18611434363',
            mchCount: 3,
            is_locked: 0,
        },
    ];
    mchColumns = [
        {title: '品牌名称', dataIndex: 'name', key: 'name'},
        {title: '门店个数', dataIndex: 'storeCount', key: 'storeCount'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        loading: false,
                        label: '编辑',
                        permission: 'mp-account-update',
                        onClick: () => alert('update'),
                    },
                    {
                        loading: false,
                        label: '删除',
                        permission: 'mp-account-delete',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                        },
                        onClick: () => alert('delete'),
                    },
                    {
                        loading: false,
                        label: '添加门店',
                        permission: 'mp-add-mch',
                        onClick: () => alert('add mch'),
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    mchData = [
        {key: 1, name: '品牌1', storeCount: 3,},
        {key: 2, name: '品牌2', storeCount: 2,},
        {key: 3, name: '品牌3', storeCount: 1},
    ];

    storeColumns = [
        {title: '门店名称', dataIndex: 'name', key: 'name'},
        {title: '门店地址', dataIndex: 'address', key: 'address'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        loading: false,
                        label: '编辑',
                        permission: 'mp-account-update',
                        onClick: () => alert('update'),
                    },
                    {
                        loading: false,
                        label: '删除',
                        permission: 'mp-account-delete',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                        },
                        onClick: () => alert('delete'),
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ]

    storeData = [
        {key: 1, name: '门店1', address: '丹东振兴区'},
        {key: 2, name: '门店2', address: '北京市朝阳区'},
    ];
    handlePageChange = (currentPage, pageSize) => {
        if (pageSize) {
            this.search({
                currentPage: 1,
                pageSize,
            });
        } else {
            this.search({
                currentPage,
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.search({
            currentPage: 1,
        });
    }
    search = (args) => {
        const {actions, form: {getFieldsValue}, currentPage, pageSize} = this.props;
        let params = {
            ...getFieldsValue(),
            currentPage,
            pageSize,
            ...args,
        };
        console.log(params);
        // TODO：查询
    }

    handleAddAccount = (values) => {
        const {actions} = this.props;
        actions.addMpUser(
            {
                name: values.name,
                account: values.account,
            },
            () => {
                this.setState({
                    accountPopoverVisible: false,
                });
            },
            () => {

            });
    }

    accountFormItems = [
        {
            field: 'name',
            label: '用户名',
            hasFeedback: true,
            fieldType: 'input', // TODO 后期用到再扩展，默认为input
            placeholder: '请输入用户名',
            fieldDecorator: {
                // initialValue: '默认值',
                rules: [
                    {required: true, message: '用户名不能为空'},
                ],
            },
        },
        {
            field: 'account',
            label: '账号',
            placeholder: '请输入手机或邮箱',
        }
    ];

    render() {
        const {form: {getFieldDecorator}, pageSize, currentPage, totalCount} = this.props;
        const {accountPopoverVisible} = this.state;
        return (
            <div className="merchant-list">
                <QueryBar>

                    <Form inline onSubmit={this.handleSubmit}>
                        <FormItem label="账号">
                            {getFieldDecorator('account')(
                                <Input placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">查询</Button>
                        </FormItem>
                    </Form>
                </QueryBar>
                <div className="tool-bar">
                    <Popover
                        placement="bottomLeft"
                        title="添加顶级"
                        visible={accountPopoverVisible}
                        onVisibleChange={accountPopoverVisible => this.setState({accountPopoverVisible})}
                        trigger="click"
                        content={
                            <FormComponent
                                formItems={this.accountFormItems}
                                width={300}
                                onSubmit={this.handleAddAccount}
                            />
                        }>
                        <Button type="primary"><Icon type="plus-circle-o"/>添加账号</Button>
                    </Popover>

                </div>
                <Table
                    columns={this.accountColumns}
                    dataSource={this.accountData}
                    pagination={false}
                    expandedRowRender={record => (
                        <Table
                            columns={this.mchColumns}
                            dataSource={this.mchData}
                            pagination={false}
                            expandedRowRender={record => (
                                <Table
                                    columns={this.storeColumns}
                                    dataSource={this.storeData}
                                    pagination={false}
                                />
                            )}
                        />
                    )}
                />

                <PaginationComponent
                    pageSize={pageSize}
                    currentPage={currentPage}
                    totalCount={totalCount}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export const LayoutComponent = Form.create()(AccountList);
export function mapStateToProps(state) {
    return {
        ...state.app,
    };
}
