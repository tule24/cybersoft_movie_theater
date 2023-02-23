import React, { useEffect, useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fectchPhimDetailAction, updatePhimAction } from '../../../../redux/actions_thunk/QuanLyPhimAction';
import { useHistory } from 'react-router-dom';
export default function EditPhim(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fectchPhimDetailAction(props.match.params.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { phimDetail } = useSelector(state => state.QuanLyPhimReducer);
    const history = useHistory();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: phimDetail.maPhim,
            tenPhim: phimDetail.tenPhim,
            trailer: phimDetail.trailer,
            moTa: phimDetail.moTa,
            ngayKhoiChieu: phimDetail.ngayKhoiChieu,
            dangChieu: phimDetail.dangChieu,
            sapChieu: phimDetail.sapChieu,
            hot: phimDetail.hot,
            danhGia: phimDetail.danhGia,
            hinhAnh: null,
            maNhom: 'GP01'
        },
        onSubmit: (values) => {
            //tạo đối tượng formdata
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
                if (key === 'hinhAnh') {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values[key], values[key].name);
                    }
                }
            }
            dispatch(updatePhimAction(formData, history));
        }
    });
    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayKhoiChieu', moment(value))
    }
    const [imgSrc, setImgSrc] = useState('');
    //closure func
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = async (e) => {
        //lấy file ra từ e
        let file = e.target.files[0];

        // Tạo đối tượng đọc file
        await formik.setFieldValue('hinhAnh', file);
        let reader = new FileReader();
        await reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        }
    }
    return (<>
        <h2 className='text-center text-2xl'>CHỈNH SỬA PHIM</h2>
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
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber name='danhGia' min={0} max={10} onChange={handleChangeSwitch('danhGia')} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input name='hinhAnh' type='file' onChange={handleChangeFile} accept='image/png, image/jpeg' />
                <br />
                <img width={150} height={150} src={imgSrc || phimDetail.hinhAnh} alt='img-file' />
            </Form.Item>
            <div className='w-1/2 mx-auto text-right'>
                <button type='submit' className='py-2 px-4 rounded-lg bg-green-500 text-white font-semibold'>Update</button>
            </div>
        </Form>
    </>
    )
}
