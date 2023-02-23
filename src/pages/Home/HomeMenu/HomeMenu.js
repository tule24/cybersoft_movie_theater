import React, { memo } from 'react';
import { Space, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

function HomeMenu(props) {
    const { arrLichChieuHeThongRap } = props;
    return (
        <div className=' my-10 h-screen overflow-auto scrollbar'>
            <Space
                style={{
                    marginBottom: 24
                }}
            >
            </Space>
            <Tabs tabPosition={'left'}>
                {arrLichChieuHeThongRap.map((item, index) => {
                    return <TabPane tab={<img className=' w-10 h-10 rounded-full' src={item.logo} alt='ava' />} key={index}>
                        <Tabs tabPosition={'left'}>
                            {item?.lstCumRap.map((cumRap, index) => {
                                return <TabPane key={index} tab={
                                    <div className=" flex w-80 -ml-5 items-start">
                                        <div className="flex-shrink-0 w-16 h-16 mb-6">
                                            <img src={cumRap.hinhAnh} alt="" className=" block object-cover object-center w-full h-full rounded bg-gray-500" />
                                        </div>
                                        <div className="flex flex-col pl-2 text-left">
                                            <h2 className=" text-lg font-semibold mb-0 whitespace-normal" style={{ lineHeight: '1.2' }}>{cumRap.tenCumRap}</h2>
                                            <span className="text-sm text-gray-400 whitespace-normal">{cumRap.diaChi}</span>
                                            <span className='text-sm text-red-500 cursor-pointer'>Chi tiết</span>
                                        </div>
                                    </div>
                                }>
                                    <div className='h-screen w-full overflow-y-scroll scrollbar'>
                                        {cumRap?.danhSachPhim.map((phim, index) => {
                                            return <div className='flex py-3 border-b-2' key={index}>
                                                <div className='flex-shrink-0 w-24 h-24 mb-6'>
                                                    <img
                                                        src={phim.hinhAnh}
                                                        alt='phim'
                                                        className=" block object-cover object-center w-full h-full rounded bg-gray-500"
                                                        onError={({ currentTarget }) => {
                                                            currentTarget.onerror = null; // prevents looping
                                                            currentTarget.src = "https://picsum.photos/id/1/200/300";
                                                        }} />
                                                </div>
                                                <div className='flex flex-col pl-2 text-left'>
                                                    <h2 className=" text-2xl font-semibold mb-0 whitespace-normal" style={{ lineHeight: '1.2' }}>{phim.tenPhim}</h2>
                                                    <div className='flex flex-wrap'>
                                                        {phim?.lstLichChieuTheoPhim.slice(0, 12).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                                                <button className=' bg-green-500 p-2 m-1 rounded-lg font-bold text-white'>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </button>
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </TabPane>
                            })}
                        </Tabs>
                    </TabPane>
                })}
            </Tabs>
        </div>
    )
}

export default memo(HomeMenu)