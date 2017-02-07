import React, {Component, PropTypes} from 'react';
import {Table, Form, Input, Button, Icon, Modal} from 'antd';
import './style.less';
import PaginationComponent from '../../../components/pagination/PaginationComponent';
import QueryBar from '../../../components/QueryBar';
import Operator from '../../../components/Operator';

import ValidationRule from '../../../services/validation-rule';

const FormItem = Form.Item;

class AccountList extends Component {

    state = {
        accountPopoverVisible: false,
        accountModalVisible: false,
        accountModalType: 'add', // edit
        editingMpUser: {
            name: '',
            account: '',
        }
    };

    componentDidMount() {
        this.search();
    }

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
                        onClick: (e) => this.handleAccountEdit(e, record),
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

        actions.getMpUsersByParams(params);
    }

    handleAccountAdd = (e) => {
        e.preventDefault();
        this.setState({
            accountModalType: 'add',
            accountModalVisible: true,
            editingMpUser: {
                account: '',
                name: '',
            }
        });
    }

    handleAccountEdit = (e, editingMpUser) => {
        e.preventDefault();
        this.setState({
            accountModalType: 'edit',
            accountModalVisible: true,
            editingMpUser: editingMpUser,
        });
    }

    handleAccountSubmit = (e) => {
        e.preventDefault();
        const {savingOrUpdatingMpUser, form: {validateFieldsAndScroll}, actions} = this.props;
        const {accountModalType, editingMpUser} = this.state;
        if (savingOrUpdatingMpUser) return;
        const fields = [
            'userAccount',
            'userName',
        ];
        validateFieldsAndScroll(fields, (errors, values) => {
            if (errors) return;

            if (accountModalType === 'edit') {
                actions.updateMpUser(
                    {
                        id: editingMpUser.id,
                        name: values.userName,
                        account: values.userAccount,
                    },
                    () => {
                        this.setState({
                            accountModalVisible: false,
                        });
                    }
                );
            } else {
                actions.addMpUser(
                    {
                        name: values.userName,
                        account: values.userAccount,
                    },
                    () => {
                        this.setState({
                            accountModalVisible: false,
                        });
                    }
                );
            }

        });
    }

    handleAccountModalCancel = () => {
        this.setState({
            accountModalVisible: false,
        });
    }

    render() {
        const {
            savingOrUpdatingMpUser,
            gettingMpUser,
            form: {getFieldDecorator},
            pageSize,
            currentPage,
            mpUsers: {results: users, totalCount},
        } = this.props;

        const {editingMpUser, accountModalVisible, accountModalType} = this.state;

        const accountModalTitle = accountModalType === 'edit' ? '编辑账号' : '添加账号';

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
                    <Button type="primary" onClick={this.handleAccountAdd}><Icon type="plus-circle-o"/>添加账号</Button>
                </div>
                <Table
                    loading={gettingMpUser}
                    columns={this.accountColumns}
                    dataSource={users}
                    pagination={false}
                    rowKey={record => record.id}
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
                <Modal
                    title={accountModalTitle}
                    visible={accountModalVisible}
                    onCancel={this.handleAccountModalCancel}
                    footer=""
                >
                    <Form onSubmit={this.handleAccountSubmit} onReset={() => this.props.form.resetFields()}>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="账号"
                        >
                            {getFieldDecorator('userAccount', {
                                initialValue: editingMpUser.account,
                                rules: [
                                    ValidationRule.required('账号'),
                                    ValidationRule.account(),
                                    ValidationRule.checkMpAccountExist(accountModalType === 'edit' ? editingMpUser.account : ''),
                                ],
                            })(
                                <Input placeholder="请输入账号" disabled={accountModalType === 'edit'}/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="用户名"
                        >
                            {getFieldDecorator('userName', {
                                initialValue: editingMpUser.name,
                                rules: [
                                    ValidationRule.required('用户名'),
                                ],
                            })(
                                <Input placeholder="请输入用户名"/>
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{span: 18, offset: 4}}>
                            <Button type="ghost" style={{marginRight: 8}} htmlType="reset">重置</Button>
                            <Button type="primary" loading={savingOrUpdatingMpUser} htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export const LayoutComponent = Form.create()(AccountList);
export function mapStateToProps(state) {
    return {
        ...state.app,
        ...state.mpUser,
    };
}
