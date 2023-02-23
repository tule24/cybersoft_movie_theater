import React, { useState } from 'react'
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { uploadPhimAction } from '../../../../redux/actions_thunk/QuanLyPhimAction';
export default function AddNew(props) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: 'GP01'
        },
        onSubmit: (values) => {
            //tạo đối tượng formdata
            let formData = new FormData();
            for(let key in values){
                formData.append(key, values[key]);
                if(key === 'hinhAnh'){
                    formData.append('File',values[key], values[key].name);
                }
            }
            dispatch(uploadPhimAction(formData));
        }
    });
    const handleChangeDatePicker = (value) => {
        formik.setFieldValue('ngayKhoiChieu', moment(value).format('DD/MM/YYYY'))
    }
    const [imgSrc, setImgSrc] = useState('');
    //closure func
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = (e) => {
        //lấy file ra từ e
        let file = e.target.files[0];

        // Tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgSrc(e.target.result);
        }
        formik.setFieldValue('hinhAnh', file);
    }
    return (<>
        <h2 className='text-center text-2xl'>THÊM PHIM MỚI</h2>
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
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
                <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker}/>
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('dangChieu')}/>
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('sapChieu')}/>
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangeSwitch('hot')}/>
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber name='danhGia' min={0} max={10} onChange={handleChangeSwitch('danhGia')}/>
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input name='hinhAnh' type='file' onChange={handleChangeFile} accept='image/png, image/jpeg'/>
                <br />
                <img width={150} height={150} src={imgSrc} alt='img-file'/>
            </Form.Item>
            <div className='w-1/2 mx-auto text-right'>
                <button type='submit' className='py-2 px-4 rounded-lg bg-green-500 text-white font-semibold'>Submit</button>
            </div>
        </Form>
    </>
    )
}
