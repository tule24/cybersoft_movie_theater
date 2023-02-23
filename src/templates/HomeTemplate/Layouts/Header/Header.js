/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { getDataUser } from '../../../../redux/reducers/QuanLyNguoiDungSlice';
const { Option } = Select;

export default function Header(props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const handleChange = (value) => {
        i18n.changeLanguage(value);
    };
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    return (
        <header className="p-4 bg-black bg-opacity-50 fixed top-0 w-full z-10 text-gray-100">
            <div className="container flex justify-between h-16 mx-auto">
                <a aria-label="Back to homepage" className="flex items-center p-2">
                    <img src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png' alt='logo' />
                </a>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink
                            to='/home'
                            className="flex items-center px-4 -mb-1 font-bold text-xl text-white"
                            activeClassName=' border-b-2'>
                            Home
                            {/* {t('hello.1')} */}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to='/news'
                            className="flex items-center px-4 -mb-1 font-bold text-xl text-white"
                            activeClassName=' border-b-2'>
                            News
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to='/contact'
                            className="flex items-center px-4 -mb-1 font-bold text-xl text-white"
                            activeClassName=' border-b-2'>
                            Contact
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink
                            to='/admin'
                            className="flex items-center px-4 -mb-1 font-bold text-xl text-white"
                            activeClassName=' border-b-2'>
                            Admin
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {Object.values(userLogin).length !== 0
                        ? <>
                            <span className='w-10 h-10 rounded-full bg-white flex items-center justify-center bg-opacity-50'><UserOutlined style={{ fontSize: '20px', color: '#000' }} /></span>
                            <NavLink to='/profile' className=' mx-4 font-bold text-2xl mb-0 text-white'>{userLogin.taiKhoan}</NavLink>
                            <button className='mx-2' onClick={() => { localStorage.clear(); dispatch(getDataUser({})); props.history.push('/home') }}><LogoutOutlined style={{ fontSize: '20px' }} /></button>
                        </>
                        : <> <NavLink
                            to='/login'
                            className="self-center px-8 py-3 text-white">
                            {t('signin')}
                        </NavLink>
                            <NavLink
                                to='/register'
                                className="self-center px-8 py-3 mr-2 font-semibold rounded bg-violet-400 text-gray-900">
                                {t('signup')}
                            </NavLink>
                        </>}

                    <Select
                        defaultValue="en"
                        style={{
                            width: 100,
                        }}
                        onChange={handleChange}
                    >
                        <Option value="en">Eng</Option>
                        <Option value="vi">Vie</Option>
                        <Option value="chi">Chi</Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </header>
    )
}
