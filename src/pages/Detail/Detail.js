import React, { useEffect, useState } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { useDispatch, useSelector } from 'react-redux'
import { Progress, Space, Tabs, Tag, Rate, Modal } from 'antd';
import { fectchPhimDetailAction } from '../../redux/actions_thunk/QuanLyPhimAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { fetchDataLichChieuPhimDetailAction } from '../../redux/actions_thunk/QuanLyRapAction';
const { TabPane } = Tabs;

export default function Detail(props) {
    const { phimDetail } = useSelector(state => state.QuanLyPhimReducer);
    const { lichChieuPhimDetail } = useSelector(state => state.QuanLyRapReducer);
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(phimDetail)
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
      };
    const dispatch = useDispatch();
    useEffect(() => {
        const id = props.match.params.id;
        dispatch(fectchPhimDetailAction(id))
        dispatch(fetchDataLichChieuPhimDetailAction(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <div className=' h-screen bg-cover bg-center' style={{ backgroundImage: `url(${phimDetail?.hinhAnh})` }}>
                <CustomCard
                    style={{ borderRadius: '0px', padding: '0px' }}
                    effectColor="#fff" // required
                    color="#fff" // default color is white
                    blur={10} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                    <div className='flex w-2/3 mx-auto items-center h-screen'>
                        <div className='w-full'>
                            <div className='flex items-center w-full'>
                                <div>
                                    <img src={phimDetail?.hinhAnh} alt='phim' className=' w-60' />
                                </div>
                                <div className=' px-5'>
                                    <p className='mb-2'>
                                        <span className='mr-1'>{moment(phimDetail?.ngayKhoiChieu).format('DD/MM/YYYY')}</span>
                                        {phimDetail?.hot ? <Tag color="#ebb734"><span className='text-black font-bold'>HOT</span></Tag> : ''}
                                    </p>
                                    <p className='mb-2 text-3xl font-bold'>{phimDetail?.tenPhim}</p>
                                    <button className=' bg-red-600 px-5 py-2 rounded-md' onClick={showModal}>Trailer</button>
                                </div>
                                <div className=' ml-auto text-center whitespace-nowrap'>
                                    <Progress type="circle" percent={phimDetail?.danhGia * 10} format={percent => `${percent}`} strokeColor='green' strokeWidth='8' strokeLinecap="butt" />
                                    <div><Rate allowHalf disabled defaultValue={phimDetail?.danhGia / 2} /></div>
                                    <p className='mb-0'>{phimDetail?.maPhim} người đánh giá</p>
                                </div>
                            </div>
                            <div className='mt-10 bg-black bg-opacity-50 p-3 rounded-md'>
                                <h1 className=' text-2xl text-red-500 font-bold'>Mô tả</h1>
                                <div>{phimDetail?.moTa}</div>
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
            <div className=' w-3/5 mx-auto my-10'>
                <Space
                    style={{
                        marginBottom: 24
                    }}
                >
                </Space>
                <Tabs tabPosition={'left'}>
                    {lichChieuPhimDetail.heThongRapChieu?.map((hethongRap, index) => {
                        return <TabPane
                            tab={<div className='flex items-center'>
                                <img className=' w-14 h-14 rounded-full' src={hethongRap.logo} alt='ava' />
                                <p className='mb-0 ml-2 text-lg'>{hethongRap.tenHeThongRap}</p>
                            </div>}
                            key={index}>
                            {hethongRap?.cumRapChieu.map((cumRap, index) => {
                                return <div className=' mb-5 border-b-2 pb-3' key={index}>
                                    <div className=" flex items-center">
                                        <div className="flex-shrink-0 w-11 h-11">
                                            <img src={cumRap.hinhAnh} alt="" className=" block object-cover object-center w-full h-full rounded bg-gray-500" />
                                        </div>
                                        <div className="flex flex-col pl-2 text-left">
                                            <h2 className=" text-lg font-semibold mb-0 whitespace-normal">{cumRap.tenCumRap}</h2>
                                            <span className="text-sm text-gray-400 whitespace-normal">{cumRap.diaChi}</span>
                                        </div>
                                    </div>
                                    <div className=' mt-3'>
                                        {cumRap?.lichChieuPhim.map((lichChieu, index) => {
                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className=' bg-green-500 p-2 m-1 rounded-lg font-bold text-white hover:bg-green-700 hover:text-white inline-block' key={index}>
                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                            </NavLink>
                                        })}
                                    </div>
                                </div>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </div>
            <Modal visible={isModalVisible}  centered onCancel={handleCancel} footer={null} closable={false} width={'80vw'}> 
            <iframe width={'100%'} height={'80vh'} src={phimDetail.trailer} title={phimDetail.tenPhim} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Modal>
        </div>
    )
}
