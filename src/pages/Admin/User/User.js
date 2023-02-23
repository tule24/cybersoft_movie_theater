import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Table, Input } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { deleteNguoiDungAction, fetchDanhSachNguoiDungAction } from '../../../redux/actions_thunk/QuanLyNguoiDungAction';
const { Search } = Input;

export default function User(props) {
    const { arrUser } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            width: 100,
            render: (text, record, index) => {
                return <span>{index+1}</span>
            }
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => {
                if (b.taiKhoan.toLowerCase().trim() > a.taiKhoan.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                if (b.hoTen.toLowerCase().trim() > a.hoTen.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['ascend', 'descend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số ĐT',
            dataIndex: 'soDt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className='flex justify-around'>
                    <NavLink to={`/admin/users/edit/${record.taiKhoan}`} className='text-xl p-2 bg-blue-500 text-white flex items-center justify-center rounded-md hover:bg-blue-700 hover:text-white'><EditOutlined /></NavLink>
                    <button className='text-xl p-2 bg-red-500 text-white flex items-center justify-center rounded-md hover:bg-red-700 hover:text-white'
                        onClick={() => {
                            if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này ' + record.taiKhoan)) {
                                dispatch(deleteNguoiDungAction(record.taiKhoan)) 
                            }
                        }}
                    ><DeleteOutlined /></button>
                </div>
            },
            width: 150
        },
    ];

    useEffect(() => {
        dispatch(fetchDanhSachNguoiDungAction(''));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h2 className='text-center text-2xl'>QUẢN LÝ TÀI KHOẢN</h2>
            <div className='mb-4 w-full flex justify-between items-center'>
                <button className='flex items-center bg-sky-500 rounded-md p-2 text-white font-semibold' onClick={() => props.history.push('/admin/users/adduser')}><PlusOutlined /><span className='ml-2'>Add User</span></button>
                <div className='w-1/4'>
                    <Search placeholder="input search user" enterButton size='large' onSearch={(value) => dispatch(fetchDanhSachNguoiDungAction(value))}/>
                </div>
            </div>
            <Table columns={columns} dataSource={arrUser} rowKey={'taiKhoan'} />
        </div>
    )
}
