import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeActiveKey, resetDanhSachGheDangDat } from '../../redux/reducers/QuanLyDatVeSlice';
import './Checkout.css'
import _ from 'lodash'
import { Tag, Tabs, Tooltip } from 'antd';
import { CloseOutlined, HomeFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { getDataUser } from '../../redux/reducers/QuanLyNguoiDungSlice';
import moment from 'moment';
import { connection } from '../../index';
import { NavLink } from 'react-router-dom';
import { fetchDanhSachPhongVeAction, postGheDangDatAction, datVeAction } from '../../redux/actions_thunk/QuanLyDatVeAction';
import { getThongTinNguoiDungAction } from '../../redux/actions_thunk/QuanLyNguoiDungAction';
const { TabPane } = Tabs;

function CheckoutDatVe(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { danhSachGhe, thongTinPhim } = useSelector(state => state.QuanLyDatVeReducer.danhSachPhongVe);
  const { arrGheDangDat, tongTien, arrGheDaDat, arrGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
  let soGheDaDat = danhSachGhe?.filter(item => item.daDat);
  soGheDaDat = soGheDaDat ? soGheDaDat.length : 0;
  const dispatch = useDispatch();
  const maLichChieu = props.match.params.id;
  useEffect(() => {
    dispatch(fetchDanhSachPhongVeAction(maLichChieu));
    dispatch(resetDanhSachGheDangDat());
    //load danh sách ghế đang đặt từ server về
    connection.on('loadDanhSachGheDaDat', (danhSachGheKhachDat) => {
      //Data trả về mảng các ghế đang được đặt realtime
      // loại mình ra khỏi danh sách
      danhSachGheKhachDat = danhSachGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
      // gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
      // eslint-disable-next-line no-unused-vars
      let arrGheKhachDat = danhSachGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, arrGhe];
      }, [])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='w-full'>
      <div className='grid grid-cols-12'>
        <div className='col-span-9 relative'>
          <div className=' h-3 bg-black mx-auto' style={{ width: '91%' }}></div>
          <div id='trapezoid' className='relative' style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 50px 25px -35px' }}>
            <p className='absolute left-1/2 translate-y-7 font-bold text-xl text-gray-500'>Screen</p>
          </div>
          <div className='container mx-auto text-center mt-16 px-2 mb-5'>
            <div className='grid grid-cols-16'>
              {danhSachGhe?.map((ghe, index) => {
                let loaiGhe = '';
                let checkUser = false;
                let checkDaDat = false;
                let title = '';
                if (ghe.daDat) {
                  loaiGhe = 'bg-red-300 cursor-not-allowed';
                  checkDaDat = true;
                  title = 'Ghế đã được đặt'
                  if (arrGheDaDat.find(item => item.maGhe === ghe.maGhe)) {
                    loaiGhe = 'bg-green-500 cursor-not-allowed';
                    checkUser = true;
                    title = 'Ghế bạn đã đặt'
                  }
                } else {
                  loaiGhe = ghe.loaiGhe === 'Thuong' ? 'bg-gray-400' : 'bg-red-500';
                  title = ghe.loaiGhe === 'Thuong' ? 'Ghế thường' : 'Ghế VIP';
                  if (arrGheDangDat.find(item => item.maGhe === ghe.maGhe)) {
                    loaiGhe = 'bg-yellow-400';
                    title = 'Ghế bạn đang đặt'
                  }
                  if (arrGheKhachDat.find(item => item.maGhe === ghe.maGhe)) {
                    loaiGhe = 'bg-blue-400 cursor-not-allowed';
                    checkDaDat = true;
                    title = 'Ghế hiện tại đang có người đặt'
                  }
                }
                return <div className='mb-3' key={index}>
                  <Tooltip placement="top" title={title}>
                    <button
                      className={`px-5 mx-1 py-2 ${loaiGhe} rounded-lg font-semibold`}
                      disabled={checkDaDat}
                      onClick={() => dispatch(postGheDangDatAction(ghe, maLichChieu))}>
                      {ghe.daDat ? (checkUser ? <UserOutlined style={{ fontSize: '16px' }} /> : <CloseOutlined style={{ fontSize: '16px' }} />) : ghe.stt}
                    </button>
                  </Tooltip>
                </div>
              })}
            </div>
          </div>
          <button className='px-5 py-2 bg-sky-500 font-semibold rounded-lg float-right mr-5 mt-5 hover:bg-sky-400' onClick={() => dispatch(resetDanhSachGheDangDat())}>Reset</button>
          <div className="flex flex-col">
            <div className=" w-3/4 mx-auto">
              <div className="py-2 inline-block w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="text-sm font-semibold text-black px-6 py-4 bg-gray-200">
                          Ghế chưa đặt
                        </th>
                        <th scope="col" className="text-sm font-semibold text-black px-6 py-4 bg-yellow-200">
                          Ghế đang đặt
                        </th>
                        <th scope="col" className="text-sm font-semibold text-black px-6 py-4 bg-red-200">
                          Ghế đã đặt
                        </th>
                        <th scope="col" className="text-sm font-semibold text-black px-6 py-4 bg-green-200">
                          Ghế bạn đã đặt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-sm  px-6 py-4 whitespace-nowrap">
                          <Tag color='#d2d2d4'><span className='text-xl text-black font-medium'>{danhSachGhe?.length || 0 - soGheDaDat}</span></Tag>
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          <Tag color='#fafa28'><span className='text-xl text-black font-medium'>{arrGheDangDat.length}</span></Tag>
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          <Tag color='#fa2832'><span className='text-xl text-black font-medium'>{soGheDaDat}</span></Tag>
                        </td>
                        <td className="text-sm px-6 py-4 whitespace-nowrap">
                          <Tag color='#28fa52'><span className='text-xl text-black font-medium'>{arrGheDaDat.length}</span></Tag>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-3 px-4 flex flex-col justify-between h-full' style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
          <div>
            <div className=' border-b-2 py-3'>
              <h3 className='text-green text-center text-5xl mb-0 text-green-500'>{tongTien.toLocaleString()} VND</h3>
            </div>
            <div className=' border-b-2 py-3'>
              <h3 className='text-2xl text-red-500'>{thongTinPhim?.tenPhim}</h3>
              <p className='font-bold'>{thongTinPhim?.tenCumRap}</p>
              <p className='font-bold'>{thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} - {thongTinPhim?.tenRap}</p>
            </div>
            <div className=' border-b-2 py-3'>
              <p className='text-gray-500 font-semibold mb-0'>Ghế <span className='mx-1'></span>
                {_.sortBy(arrGheDangDat, [function (o) { return Number(o.stt) }]).map((item, index) => {
                  return <Tag key={index} color='red'>{item.stt}</Tag>
                })}
              </p>
            </div>
            <div className=' border-b-2 py-3'>
              <p className='mb-0 font-semibold text-gray-500'>E-Mail</p>
              <p className='mb-0 font-bold'>{userLogin.email}</p>
            </div>
            <div className=' border-b-2 py-3'>
              <p className='mb-0 font-semibold text-gray-500'>Phone</p>
              <p className='mb-0 font-bold'>{userLogin.soDT}</p>
            </div>
            <div className=' border-b-2 py-3 flex justify-between items-center'>
              <div>
                <p className='mb-0 font-semibold text-gray-500'>Mã giảm giá</p>
                <input type='text' placeholder='Nhập tại đây...' className=' py-1 focus:outline-none' />
              </div>
              <div className='mr-3'>
                <button className=' px-5 py-2 bg-gray-500 rounded-lg text-white hover:bg-green-500'>Áp dụng</button>
              </div>
            </div>
            <div className=' py-3 border-b-2'>
              <p className='font-semibold text-gray-500'>Hình thức thanh toán</p>
              <p className='text-red-500'>Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.</p>
            </div>
          </div>
          <div className='text-center'>
            Vé đã mua không thể đổi hoặc hoàn tiền <br />
            Mã vé sẽ được gửi qua tin nhắn <span className=' text-orange-400'>ZMS</span>(tin nhắn Zalo) và <span className=' text-orange-400'>Email</span> đã nhập
            <div className='py-3 text-center'>
              <button
                className='rounded-md bg-red-600 text-white hover:bg-red-500 w-full py-3 font-semibold'
                onClick={() => dispatch(datVeAction({ maLichChieu: maLichChieu, danhSachVe: arrGheDangDat }))}>Đặt vé</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckoutKetQua(props) {
  const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThongTinNguoiDungAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <section className="text-gray-600 body-font">
      <div className='flex justify-between items-center'>
        <div className="flex flex-col text-center w-full">
          <h1 className="text-4xl font-bold title-font mb-4 text-purple-700">Lịch sử đặt vé khách hàng</h1>
        </div>
        <div className="max-w-md px-8 pt-4 sm:flex sm:space-x-6 text-black">
          <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
            <img src="https://source.unsplash.com/100x100/?portrait?1" alt="" className="object-cover object-center w-full h-full rounded bg-gray-500" />
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{thongTinTaiKhoan.hoTen}</h2>
              <span className="text-sm text-gray-400">{thongTinTaiKhoan.loaiNguoiDung}</span>
            </div>
            <div className="space-y-1">
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                  <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                </svg>
                <span className="text-gray-400">{thongTinTaiKhoan.email}</span>
              </span>
              <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                  <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                </svg>
                <span className="text-gray-400">{thongTinTaiKhoan.soDT || 'No data'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {thongTinTaiKhoan.thongTinDatVe?.map((item, index) => {
        return <section className="text-gray-600 body-font overflow-hidden" key={index}>
          <div className="container px-5 py-10 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className=" w-80 md:mb-0 mb-6 flex flex-col items-center">
                  <img src={item.hinhAnh} alt='' className=' w-40 h-40 rounded-lg' />
                  <span className="font-bold text-lg title-font text-gray-700 mt-2">{item.tenPhim}</span>
                </div>
                <div className="pl-2 lg:w-1/3 md:w-1/2 flex-grow">
                  <div className="h-full flex items-start border-gray-200 border p-4 rounded-lg w-full">
                    <div className='flex-grow'>
                      <h2 className="text-gray-900 title-font font-medium whitespace-nowrap">{item.danhSachGhe[0].tenHeThongRap}</h2>
                      <p className="text-gray-500">{item.danhSachGhe[0].tenCumRap}</p>
                      <p className="mt-1 text-gray-500 text-sm">Ngày chiếu: <b>{moment(item.ngayDat).format('DD-MM-YYYY')}</b></p>
                      <p className="mt-1 text-gray-500 text-sm">Giờ chiếu: <b>{moment(item.ngayDat).format('hh:mm A')}</b></p>
                      <p className='mt-1 text-gray-500'>Tổng số ghế đặt: <b>{item.danhSachGhe?.length || 0}</b></p>
                    </div>
                    <div className="flex flex-wrap">
                      {_.sortBy(item.danhSachGhe, [function (o) { return Number(o.tenGhe) }])?.map((ghe, index) => {
                        return <div className='rounded p-3 bg-green-500 text-gray-700 font-semibold ml-5 text-lg mb-2' key={index}>
                          {ghe.tenGhe}
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      })}
    </section>
  )
}



export default function Checkout(props) {
  const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
  const operations = <div className='flex items-center'>
    <button
      className='bg-sky-300 px-3 py-2 rounded-lg mr-5 flex items-center text-base hover:bg-sky-400'
      onClick={() => props.history.push('/home')}
    >
      <HomeFilled style={{ fontSize: '20px', color: '#000' }}/></button>
    <>
      <span className='w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center bg-opacity-50'><UserOutlined style={{ fontSize: '20px', color: '#000' }} /></span>
      <NavLink to='/profile' className=' mx-1 font-semibold text-xl mb-0 text-black'>{thongTinTaiKhoan.taiKhoan}</NavLink>
      <button className='mx-2' onClick={() => {localStorage.clear(); dispatch(getDataUser({})); props.history.push('/home')}}><LogoutOutlined style={{fontSize:'20px'}}/></button>
    </>
  </div>;
  const { activeKey } = useSelector(state => state.QuanLyDatVeReducer);
  const dispatch = useDispatch();
  return (
    <div className='w-full pl-2 pt-2'>
      <Tabs defaultActiveKey='1' activeKey={activeKey} onTabClick={(key) => dispatch(changeActiveKey(key))} tabBarExtraContent={operations}>
        <TabPane tab="01 Chọn ghế thanh toán" key="1" >
          {CheckoutDatVe(props)}
        </TabPane>
        <TabPane tab="02 Lịch sử đặt vé" key="2">
          {CheckoutKetQua(props)}
        </TabPane>
      </Tabs>
    </div>
  )
}