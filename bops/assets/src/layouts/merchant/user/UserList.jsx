import React, {Component, PropTypes} from 'react';
import {Table, Form, Input, Button, Icon, Modal, Switch, Alert} from 'antd';
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
        },

        mchModalVisible: false,
        mchModalType: 'add', // edit
        editingMch: {
            name: '',
            logo: '',
            mobile: '',
            tel: '',
            state: '',
            owner_id: '',
        },
    };

    componentDidMount() {
        this.search();
    }

    accountColumns = [
        {title: '账号', dataIndex: 'account', key: 'account'},
        {title: '用户名', dataIndex: 'name', key: 'name'},
        {
            title: '品牌个数',
            dataIndex: 'mchCount',
            key: 'mchCount',
            render: (text, record) => {
                return record.merchants ? record.merchants.length : 0;
            },
        },
        {
            title: '管理员',
            dataIndex: 'is_admin',
            key: 'is_admin',
            render: (text, record) => {
                return record.is_admin ? '是' : '否';
            },
        },
        {
            title: '是否锁定',
            dataIndex: 'is_locked',
            key: 'is_locked',
            render: (text, record) => {
                const id = record.id;
                const loading = this.props.switchingLockMpUser[id];
                const loadingChildren = <Icon type="loading"/>;
                let checkedChildren = '是';
                let unCheckedChildren = '否';

                if (loading) {
                    checkedChildren = loadingChildren;
                    unCheckedChildren = loadingChildren;
                }

                return (
                    <Switch
                        unCheckedChildren={unCheckedChildren}
                        checkedChildren={checkedChildren}
                        checked={record.is_locked}
                        onChange={(checked) => {
                            if (loading) return;
                            this.props.actions.toggleMpUserLock({id, isLocked: !checked});
                        }}
                    />
                );
            },
        },
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const id = record.id;
                const items = [
                    {
                        label: '编辑',
                        permission: 'mp-user-update',
                        onClick: (e) => this.handleAccountEdit(e, record),
                    },
                    {
                        loading: this.props.deletingMpUser[id],
                        label: '删除',
                        permission: 'mp-user-delete',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                        },
                        onClick: () => this.props.actions.deleteMpUser({id}),
                    },

                    {
                        label: '添加品牌',
                        permission: 'mp-mch-add',
                        onClick: (e) => this.handleMchAdd(e, record),
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    mchColumns = [
        {title: '品牌名称', dataIndex: 'name', key: 'name'},
        {title: '品牌logo', dataIndex: 'logo', key: 'logo'},
        {title: '联系电话', dataIndex: 'mobile', key: 'mobile'},
        {title: '联系座机', dataIndex: 'tel', key: 'tel'},
        {title: '状态', dataIndex: 'state', key: 'state'},
        {title: '门店个数', dataIndex: 'storeCount', key: 'storeCount'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        loading: false,
                        label: '编辑',
                        permission: 'mch-update',
                        onClick: () => alert('update'),
                    },
                    {
                        loading: false,
                        label: '删除',
                        permission: 'mch-delete',
                        confirm: {
                            title: `您确定要删除“${record.name}”？`,
                        },
                        onClick: () => alert('delete'),
                    },
                    {
                        loading: false,
                        label: '添加门店',
                        permission: 'store-add',
                        onClick: () => alert('add mch'),
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
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
            ...getFieldsValue(['account']),
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
                        is_admin: true,
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

    handleMchAdd = (e, mpUser) => {
        e.preventDefault();
        this.setState({
            mchModalType: 'add',
            mchModalVisible: true,
            editingMch: {
                name: '',
                logo: '',
                mobile: '',
                tel: '',
                state: '',
                owner_id: mpUser.id,
            }
        });
    }

    handleMchSubmit = (e) => {
        e.preventDefault();
        const {savingOrUpdatingMch, form: {validateFieldsAndScroll}, actions} = this.props;
        const {mchModalType, editingMch} = this.state;
        if (savingOrUpdatingMch) return;
        const fields = [
            'mchName',
            'mchLogo',
            'mchMobile',
            'mchTel',
        ];
        validateFieldsAndScroll(fields, (errors, values) => {
            if (errors) return;

            const id = editingMch.id;
            const owner_id = editingMch.owner_id;
            const name = values.mchName;
            const logo = values.mchLogo;
            const mobile = values.mchMobile;
            const tel = values.mchTel;
            const state = 'verified';

            if (mchModalType === 'edit') {
                actions.updateMch(
                    {id, name, logo, mobile, tel,},
                    () => {
                        this.setState({
                            mchModalVisible: false,
                        });
                    }
                );
            } else {
                actions.addMch(
                    {name, logo, mobile, tel, owner_id, state,},
                    () => {
                        this.setState({
                            mchModalVisible: false,
                        });
                    }
                );
            }

        });
    }

    handleMchModalCancel = () => {
        this.setState({
            mchModalVisible: false,
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
            currentUser,

            savingOrUpdatingMch,
        } = this.props;

        const {
            accountModalVisible,
            accountModalType,
            editingMpUser,

            mchModalVisible,
            mchModalType,
            editingMch,
        } = this.state;

        const accountModalTitle = accountModalType === 'edit' ? '编辑用户' : '添加用户';
        const mchModalTitle = mchModalType === 'edit' ? '编辑品牌' : '添加品牌';


        const showAddBtn = currentUser && currentUser.permissions && currentUser.permissions.indexOf('mp-user-add') > -1;

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
                    {showAddBtn ?
                        <Button type="primary" onClick={this.handleAccountAdd}><Icon type="plus-circle-o"/>添加用户</Button>
                        : null
                    }
                </div>
                <Table
                    loading={gettingMpUser}
                    columns={this.accountColumns}
                    dataSource={users}
                    pagination={false}
                    rowKey={record => record.id}
                    expandedRowRender={user => (
                        <Table
                            columns={this.mchColumns}
                            dataSource={user.merchants}
                            pagination={false}
                            rowKey={merchant => merchant.id}
                            expandedRowRender={merchant => (
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
                    {accountModalType === 'add' ?
                        <Alert message="添加的用户默认为管理员，普通用户由商户自行维护" type="info"/>
                        :
                        null
                    }
                    <Form onSubmit={this.handleAccountSubmit}
                          onReset={() => this.props.form.resetFields(['userAccount', 'userName'])}>
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

                <Modal
                    title={mchModalTitle}
                    visible={mchModalVisible}
                    onCancel={this.handleMchModalCancel}
                    footer=""
                >
                    <Form onSubmit={this.handleMchSubmit}
                          onReset={() => this.props.form.resetFields(['mchName', 'mchLogo', 'mchMobile', 'mchTel', 'mchState'])}>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="品牌名称"
                        >
                            {getFieldDecorator('mchName', {
                                initialValue: editingMch.name,
                                rules: [
                                    ValidationRule.required('品牌名称'),
                                ],
                            })(
                                <Input placeholder="请输入品牌名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="品牌logo"
                        >
                            {getFieldDecorator('mchLogo', {
                                initialValue: editingMch.logo,
                                rules: [
                                    ValidationRule.required('品牌logo'),
                                ],
                            })(
                                <Input placeholder="请输入品牌logo"/>
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="联系电话"
                        >
                            {getFieldDecorator('mchMobile', {
                                initialValue: editingMch.mobile,
                                rules: [
                                    ValidationRule.required('联系电话'),
                                    ValidationRule.mobile(),
                                ],
                            })(
                                <Input placeholder="请输入联系电话"/>
                            )}
                        </FormItem>

                        <FormItem
                            labelCol={{span: 4}}
                            wrapperCol={{span: 18}}
                            label="联系座机"
                        >
                            {getFieldDecorator('mchTel', {
                                initialValue: editingMch.tel,
                            })(
                                <Input placeholder="请输入联系座机"/>
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{span: 18, offset: 4}}>
                            <Button type="ghost" style={{marginRight: 8}} htmlType="reset">重置</Button>
                            <Button type="primary" loading={savingOrUpdatingMch} htmlType="submit">保存</Button>
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
        currentUser: state.app.user,
    };
}
