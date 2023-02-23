import React from 'react'
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { postUserRegisterAction } from '../../redux/actions_thunk/QuanLyNguoiDungAction';

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="w-full mx-auto rounded shadow">
      <Formik
        initialValues={{
          taiKhoan: '',
          matKhau: '',
          email: '',
          soDt: '',
          maNhom: '',
          hoTen: ''
        }}
        validationSchema={Yup.object({
          taiKhoan: Yup.string().trim().required('Tài khoản không được để trống'),
          matKhau: Yup.string().trim().required('Mật khẩu không được để trống').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
          email: Yup.string().required('Email không được để trống').email('Email không hợp lệ'),
          soDt: Yup.string().required('Số ĐT không được để trống').matches(/([0-9]+)/, 'Điện thoại chỉ chứa số'),
          maNhom: Yup.string().trim().required('Mã nhóm không được để trống'),
          hoTen: Yup.string().trim().required('Họ tên không được để trống')
        })}
        onSubmit={values => {
          dispatch(postUserRegisterAction(values, history));
        }}
      >
        {({ errors, touched }) => (
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
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">Mã nhóm</label>
                <Field name='maNhom' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Mã nhóm" />
                {errors.maNhom && touched.maNhom ? <p className='mb-0 text-rose-500'>{errors.maNhom}</p> : null}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Tài khoản</label>
              <Field name='taiKhoan' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='text' placeholder="Tài khoản" />
              {errors.taiKhoan && touched.taiKhoan ? <p className='mb-0 text-rose-500'>{errors.taiKhoan}</p> : null}
            </div>
            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">Mật khẩu</label>
              <Field name='matKhau' className="appearance-none border rounded w-full py-2 px-3 text-grey-darker" type='password' placeholder="Mật khẩu" />
              {errors.matKhau && touched.matKhau ? <p className='mb-0 text-rose-500'>{errors.matKhau}</p> : null}
            </div>
            <div className="flex items-center justify-between mt-8">
              <button className=" bg-gray-600 bg-opacity-80 hover:bg-opacity-50 text-black font-bold text-md py-2 px-9 rounded-full" type="submit">
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  )
}
