import React from 'react'
import './Film.css'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

export default function Films(props) {
    const {maPhim, tenPhim, hinhAnh, ngayKhoiChieu, danhGia, moTa } = props.item;
    return (
        <div className="films rounded-md shadow-md bg-gray-900 text-gray-100 m-2 overflow-hidden relative">
            <div className='overlay'>{moTa}</div>
            <img src={hinhAnh} alt="" className="object-cover object-center w-full h-96 rounded-t-md bg-gray-500" />
            <div className="flex flex-col px-5 py-3 h-52 justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-wide text-white">{tenPhim}</h2>
                    <p>Rating: {danhGia}/10</p>
                    <p>Ngày khởi chiếu: {moment(ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                </div>
                <NavLink 
                to={`detail/${maPhim}`} 
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-red-400 text-gray-900 hover:text-white">Mua Vé</NavLink>
            </div>
        </div>
    )
}
