import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { postUserLoginAction } from '../../redux/actions_thunk/QuanLyNguoiDungAction';

export default function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {
      dispatch(postUserLoginAction(values, history));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="mb-4">Please login to your account</p>
      <div className="mb-4">
        <input
          type="text"
          name='taiKhoan'
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.taiKhoan}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name='matKhau'
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.matKhau}
        />
      </div>
      <div className="text-center pt-1 mb-12 pb-1">
        <button className="inline-block px-6 py-2.5 text-black font-bold text-md leading-tight uppercase rounded shadow-md bg-gray-600 bg-opacity-80 hover:bg-opacity-50 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3" type="submit">
          Log in
        </button>
        <a className="text-gray-500" href="#!">Forgot password?</a>
      </div>
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Don't have an account?</p>
        <button type="button" className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={() => props.history.push('/register')}
        >
          Register
        </button>
      </div>
    </form>
  )
}
