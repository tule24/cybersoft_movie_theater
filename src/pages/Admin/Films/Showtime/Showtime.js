import React, { useEffect, useState } from 'react'
import {
  DatePicker,
  Form,
  InputNumber,
  Select
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyRapService } from '../../../../services/QuanLyRapServices';
import { STATUS_CODE } from '../../../../utils/Constant/settingSystem';
import { useDispatch } from 'react-redux';
import { taoLichChieuAction } from '../../../../redux/actions_thunk/QuanLyDatVeAction';

export default function Showtime(props) {

  const filmParams = JSON.parse(localStorage.getItem('filmParams'))
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: ''
    },
    onSubmit: (values) => {
      dispatch(taoLichChieuAction(values));
    }
  });
  const handleChangeHeThongRap = (value) => {
    try {
      const fetchDataCumRap = async () => {
        let { data, status } = await quanLyRapService.getCumRapTheoHeThong(value);
        if (status === STATUS_CODE.SUCCESS) {
          setState({ ...state, cumRapChieu: [...data.content] })
        } else {
          console.log(status);
        }
      }
      fetchDataCumRap();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeCumRap = (value) => {
    formik.setFieldValue('maRap', value);
  }
  const handleOk = (values) => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
  }
  const handleChangeInputNumber = (values) => {
    formik.setFieldValue('giaVe', values)
  }
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: []
  })

  useEffect(() => {
    try {
      const fetchDataHeThongRap = async () => {
        let { data, status } = await quanLyRapService.getHeThongRap();
        if (status === STATUS_CODE.SUCCESS) {
          setState({ ...state, heThongRapChieu: [...data.content] })
        } else {
          console.log(status);
        }
      }
      fetchDataHeThongRap();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <h2 className='text-center text-2xl'>T???O L???CH CHI???U - {props.match.params.tenPhim}</h2>
      <div className='w-full flex mt-5'>
        <div className=' w-40'>
          <img src={filmParams.hinhAnh} alt='hinhAnh' className='w-full'/>
        </div>
        <div className=' flex-grow'>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onSubmitCapture={formik.handleSubmit}
          >
            <Form.Item label='H??? th???ng r???p'>
              <Select
                options={state.heThongRapChieu?.map((item) => ({ label: item.tenHeThongRap, value: item.maHeThongRap }))}
                placeholder="Ch???n h??? th???ng r???p..."
                onChange={handleChangeHeThongRap} />
            </Form.Item>
            <Form.Item label='C???m r???p'>
              <Select
                options={state.cumRapChieu?.map((item) => ({ label: item.tenCumRap, value: item.maCumRap }))}
                placeholder="Ch???n c???m r???p..."
                onChange={handleChangeCumRap} />
            </Form.Item>
            <Form.Item label='Ng??y chi???u'>
              <DatePicker showTime onOk={handleOk} format='DD/MM/YYYY hh:mm:ss' />
            </Form.Item>
            <Form.Item label='Gi?? v??'>
              <InputNumber
                min={75000}
                max={150000}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                onChange={handleChangeInputNumber}
              />
            </Form.Item>
            <div className='w-1/2 mx-auto text-right'>
              <button type='submit' className='py-2 px-4 rounded-lg bg-green-500 text-white font-semibold'>Update</button>
            </div>
          </Form>
        </div>
      </div>

    </>
  )
}
