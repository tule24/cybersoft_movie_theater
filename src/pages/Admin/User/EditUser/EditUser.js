import { Field, Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoaiNguoiDungAction, updateThongTinNguoiDungPostAction } from '../../../../redux/actions_thunk/QuanLyNguoiDungAction';

export default function EditUser(props) {
  const { arrUser } = useSelector(state => state.QuanLyNguoiDungReducer);
  const thongTinTaiKhoan = _.find(arrUser, item => item.taiKhoan === props.match.params.id);
  const dispatch = useDispatch();
  let [arrLoaiNguoiDung, setArrLoaiNguoiDung] = useState([]);
  useEffect(() => {
    dispatch(fetchLoaiNguoiDungAction()).then(result => setArrLoaiNguoiDung(result)).catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="w-1/2 mx-auto">
      <h2 className='text-center text-2xl'>CHỈNH SỬA THÔNG TIN TÀI KHOẢN</h2>
      <Formik
        enableReinitialize
        initialValues={{
          taiKhoan: thongTinTaiKhoan?.taiKhoan,
          matKhau: thongTinTaiKhoan?.matKhau,
          email: thongTinTaiKhoan?.email,
          soDt: thongTinTaiKhoan?.soDt,
          hoTen: thongTinTaiKhoan?.hoTen,
          maLoaiNguoiDung: thongTinTaiKhoan?.maLoaiNguoiDung,
          maNhom: 'GP01'
        }}
        validationSchema={Yup.object({
          matKhau: Yup.string().trim().required('Mật khẩu không được để trống').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
          email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
          soDt: Yup.string().required('Số ĐT không được để trống').matches(/([0-9]+)/, 'Điện thoại chỉ chứa số'),
          hoTen: Yup.string().trim().required('Họ tên không được để trống'),
        })}
        onSubmit={values => {
          console.log(values);
          dispatch(updateThongTinNguoiDungPostAction(values))
        }}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2" >Họ tên</label>
              <Field name='hoTen' type='text' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" placeholder="Họ tên" />
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
              <div className="mb-4 flex-grow">
                <label className="block text-grey-darker text-sm font-bold mb-2">Loại người dùng</label>
                <select className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" name='maLoaiNguoiDung' value={values.maLoaiNguoiDung} onChange={handleChange}>
                  {arrLoaiNguoiDung.map((item, index) => {
                    return <option value={item.maLoaiNguoiDung} key={index}>{item.tenLoai}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Tài khoản</label>
              <Field name='taiKhoan' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Tài khoản" disabled={true} />
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
