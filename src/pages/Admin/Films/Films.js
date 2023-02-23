import React, { useEffect } from 'react'
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deletePhimAction, fetchDataPhimAction } from '../../../redux/actions_thunk/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
const { Search } = Input;

export default function Films(props) {
    const dispatch = useDispatch();
    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    useEffect(() => {
        dispatch(fetchDataPhimAction())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => b.maPhim - a.maPhim,
            sortDirections: ['ascend', 'descend'],
            width: 100
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, record, index) => {
                return <img src={text} alt='text' width={60} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
            },
            width: 100
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                if (b.tenPhim.toLowerCase().trim() > a.tenPhim.toLowerCase().trim()) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['ascend', 'descend'],
            width: 300,
            render: (text, record, index) => {
                return <b>{text}</b>
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            // {film.mota.length > 50 ? film.moTa.substr(0,50) + '...' : film.moTa}
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                return <div className='flex justify-around'>
                    <NavLink to={`/admin/films/edit/${record.maPhim}`} className='text-xl p-2 bg-blue-500 text-white flex items-center justify-center rounded-md hover:bg-blue-700 hover:text-white'><EditOutlined /></NavLink>
                    <button className='text-xl p-2 bg-red-500 text-white flex items-center justify-center rounded-md hover:bg-red-700 hover:text-white'
                        onClick={() => {
                            if (window.confirm('Bạn có chắc chắn muốn xóa phim ' + record.tenPhim)) {
                                dispatch(deletePhimAction(record.maPhim));
                            }
                        }}
                    ><DeleteOutlined /></button>
                    <NavLink to={`/admin/films/showtimes/${record.maPhim}/${record.tenPhim}`} 
                    className='text-xl p-2 bg-green-500 text-white flex items-center justify-center rounded-md hover:bg-green-700 hover:text-white'
                    onClick={() => {localStorage.setItem('filmParams', JSON.stringify(record))}}><CalendarOutlined /></NavLink>
                </div>
            },
            width: 150
        },
    ];
    const data = arrPhim;
    return (
        <>
            <h2 className='text-center text-2xl'>QUẢN LÝ PHIM</h2>
            <div className='mb-4 w-full flex justify-between items-center'>
                <button className='flex items-center bg-sky-500 rounded-md p-2 text-white font-semibold' onClick={() => props.history.push('/admin/films/addnew')}><PlusOutlined /><span className='ml-2'>Add Films</span></button>
                <div className='w-1/4'>
                    <Search placeholder="input search films" enterButton size='large' onSearch={(value) => dispatch(fetchDataPhimAction(value))} />
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey={'maPhim'} />
        </>
    )
}
