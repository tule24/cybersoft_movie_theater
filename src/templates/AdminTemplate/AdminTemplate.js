import React, { Fragment, useState } from 'react'
import { Route, Redirect } from 'react-router';
import { USER_LOGIN } from '../../utils/Constant/settingSystem';
import {
    RightCircleOutlined,
    LeftCircleOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    PlusCircleOutlined,
    HomeFilled,
    HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './AdminTemplate.css'
import { NavLink, useHistory } from 'react-router-dom';
import { getDataUser } from '../../redux/reducers/QuanLyNguoiDungSlice';
import { useDispatch } from 'react-redux';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Sider, Content } = Layout;


export const AdminTemplate = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { Component, ...restProps } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const user_login = JSON.parse(localStorage.getItem(USER_LOGIN));
    //user_login.maLoaiNguoiDung !== 'QuanTri'
    if (!user_login) {
        alert('Bạn không có quyền truy cập vào trang này!');
        return <Redirect to='/home' />
    }
    return <Route {...restProps} render={(propsRoute) => { // location, match, history
        return <Fragment>
            <Layout style={{ minHeight: '100vh', height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo p-3">
                        <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='logo' />
                    </div>
                    <Menu mode="inline" defaultSelectedKeys={['dashboard']} theme="dark">
                        <Menu.Item key="dashboard" icon={<HomeOutlined />}>
                            <NavLink to='/admin'>
                                Dashboard
                            </NavLink>
                        </Menu.Item>
                        <SubMenu key="subfilms" icon={<VideoCameraOutlined />} title='Films'>
                            <Menu.Item key='films' icon={<VideoCameraOutlined />}>
                                <NavLink to='/admin/films'>
                                    Films
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key='addnew' icon={<PlusCircleOutlined />}>
                                <NavLink to='/admin/films/addnew'>
                                    Add new
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key='user' icon={<UserOutlined />}>
                                <NavLink to='/admin/users'>
                                    User
                                </NavLink>
                            </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        {React.createElement(collapsed ? RightCircleOutlined : LeftCircleOutlined, {
                            className: 'trigger text-xl',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div className=' float-right flex items-center'>
                            <button
                                className='bg-sky-300 px-3 py-2 rounded-lg mr-5 flex items-center text-base hover:bg-sky-400'
                                onClick={() => history.push('/home')}
                            >
                                <HomeFilled style={{ fontSize: '20px', color: '#000' }} /></button>
                            <span className='w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center bg-opacity-50'><UserOutlined style={{ fontSize: '20px', color: '#000' }} /></span>
                            <NavLink to='/profile' className=' mx-1 font-semibold text-xl mb-0 text-black'>{user_login?.taiKhoan || ''}</NavLink>
                            <button className='mx-2' onClick={() => { localStorage.clear(); dispatch(getDataUser({})); propsRoute.history.push('/home') }}><LogoutOutlined style={{ fontSize: '20px' }} /></button>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}