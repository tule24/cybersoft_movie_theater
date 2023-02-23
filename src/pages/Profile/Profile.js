import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getThongTinNguoiDungAction, updateThongTinNguoiDungAction } from '../../redux/actions_thunk/QuanLyNguoiDungAction';
import _ from 'lodash'
import { HomeFilled, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { getDataUser } from '../../redux/reducers/QuanLyNguoiDungSlice';
import { changeActiveKey } from '../../redux/reducers/QuanLyDatVeSlice';
import { Tabs } from 'antd';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
const { TabPane } = Tabs;

function LichSuDatVe(props, thongTinTaiKhoan) {
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
              <h2 className="text-2xl font-semibold whitespace-nowrap">{thongTinTaiKhoan.hoTen}</h2>
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

function ThongTinCaNhan(props, thongTinTaiKhoan, dispatch) {
  return (
  <div className="w-1/2 mx-auto">
    <Formik
      enableReinitialize
      initialValues={{
        taiKhoan: thongTinTaiKhoan.taiKhoan,
        matKhau: thongTinTaiKhoan.matKhau,
        email: thongTinTaiKhoan.email,
        soDt: thongTinTaiKhoan.soDT,
        maNhom: thongTinTaiKhoan.maNhom,
        hoTen: thongTinTaiKhoan.hoTen,
        maLoaiNguoiDung: thongTinTaiKhoan.loaiNguoiDung?.indexOf('Khách') !== -1 ? 'KhachHang' : 'QuanTri'
      }}
      validationSchema={Yup.object({
        matKhau: Yup.string().trim().required('Mật khẩu không được để trống').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
        email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
        soDt: Yup.string().required('Số ĐT không được để trống').matches(/([0-9]+)/, 'Điện thoại chỉ chứa số'),
        hoTen: Yup.string().trim().required('Họ tên không được để trống'),
      })}
      onSubmit={values => {
        dispatch(updateThongTinNguoiDungAction(values))
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" >Họ tên</label>
            <Field name='hoTen' type='text' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="Họ tên"/>
            {errors.hoTen && touched.hoTen ? <p className='mb-0 text-rose-500'>{errors.hoTen}</p> : null}
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" >Email</label>
            <Field name='email' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="email" placeholder="Email" />
            {errors.email && touched.email ? <p className='mb-0 text-rose-500'>{errors.email}</p> : null}
          </div>
          <div className="flex justify-between">
            <div className="mb-4 flex-grow pr-5">
              <label className="block text-grey-darker text-sm font-bold mb-2">Số điện thoại</label>
              <Field name='soDt' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Số điện thoại" />
              {errors.soDt && touched.soDt ? <p className='mb-0 text-rose-500'>{errors.soDt}</p> : null}
            </div>
            <div className="mb-4 flex-grow pr-5">
              <label className="block text-grey-darker text-sm font-bold mb-2">Loại người dùng</label>
              <Field className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' disabled={true} value={thongTinTaiKhoan.loaiNguoiDung}/>
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Mã nhóm</label>
              <Field name='maNhom' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Mã nhóm" disabled={true}/>
              {errors.maNhom && touched.maNhom ? <p className='mb-0 text-rose-500'>{errors.maNhom}</p> : null}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">Tài khoản</label>
            <Field name='taiKhoan' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Tài khoản" disabled={true}/>
          </div>
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">Mật khẩu</label>
            <Field name='matKhau' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Mật khẩu" />
            {errors.matKhau && touched.matKhau ? <p className='mb-0 text-rose-500'>{errors.matKhau}</p> : null}
          </div>
          <div className="mt-8 text-right">
            <button className=" bg-green-600 bg-opacity-80 hover:bg-opacity-50 text-white font-bold text-md py-2 px-9 rounded-full" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Formik>
  </div >
  )
}

export default function Profile(props) {
  const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThongTinNguoiDungAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const operations = <div className='flex items-center'>
    <button
      className='bg-sky-300 px-3 py-2 rounded-lg mr-5 flex items-center text-base hover:bg-sky-400'
      onClick={() => props.history.push('/home')}
    >
      <HomeFilled style={{ fontSize: '20px', color: '#000' }} /></button>
    <>
      <span className='w-9 h-9 rounded-full bg-gray-500 flex items-center justify-center bg-opacity-50'><UserOutlined style={{ fontSize: '20px', color: '#000' }} /></span>
      <NavLink to='/profile' className=' mx-1 font-semibold text-xl mb-0 text-black'>{thongTinTaiKhoan.taiKhoan}</NavLink>
      <button className='mx-2' onClick={() => { localStorage.clear(); dispatch(getDataUser({})); props.history.push('/home') }}><LogoutOutlined style={{ fontSize: '20px' }} /></button>
    </>
  </div>;
  return (
    <div className='w-full pl-2 pt-2'>
      <Tabs defaultActiveKey='1' onTabClick={(key) => dispatch(changeActiveKey(key))} tabBarExtraContent={operations}>
        <TabPane tab="Thông tin khách hàng" key="1" >
          {ThongTinCaNhan(props, thongTinTaiKhoan, dispatch)}
        </TabPane>
        <TabPane tab="Lịch sử đặt vé" key="2">
          {LichSuDatVe(props, thongTinTaiKhoan)}
        </TabPane>
      </Tabs>
    </div>
  )
}