import { delay } from 'lodash';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungServices';
import { ACCESS_TOKEN, STATUS_CODE, USER_LOGIN } from '../../utils/Constant/settingSystem';
import { noti } from '../../utils/noti';
import {getDanhSachUser, getDataUser, getThongTinTaiKhoan} from '../reducers/QuanLyNguoiDungSlice'

export const postUserLoginAction = (userObj, history) => async(dispatch) => {
    try{
        const {data, status} = await quanLyNguoiDungService.dangNhap(userObj);
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getDataUser(data.content));
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
            localStorage.setItem(ACCESS_TOKEN, data.content.accessToken);
            history.push('/home');
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}

export const postUserRegisterAction = (userObj, history) => async(dispatch) => {
    try{
        const {status} = await quanLyNguoiDungService.dangKy(userObj);
        if(status === STATUS_CODE.SUCCESS){
            noti('Đăng ký thành công', 'success');
            delay(() => {
                history.push('/login');
            }, 1000)
        } else {
            console.log(status);
            noti('Đăng ký thất bại', 'error');
        }
    } catch(err){
        console.log(err);
        noti('Đăng ký thất bại', 'error');
    }
}

export const getThongTinNguoiDungAction = () => async(dispatch) => {
    try{
        const {data, status} = await quanLyNguoiDungService.getThongTinNguoiDung();
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getThongTinTaiKhoan(data.content))
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}

export const updateThongTinNguoiDungAction = (userObj) => async(dispatch) => {
    try{
        const {data, status} = await quanLyNguoiDungService.updateThongTinNguoiDung(userObj);
        if(status === STATUS_CODE.SUCCESS){
            noti('Cập nhật thông tin thành công', 'success');
            dispatch(getThongTinTaiKhoan(data.content))
        } else {
            noti('Cập nhật thông tin thất bại', 'error');
            console.log(status);
        }
    } catch(err){
        noti('Cập nhật thông tin thất bại', 'error');
        console.log(err);
    }
}

export const updateThongTinNguoiDungPostAction = (userObj) => async(dispatch) => {
    try{
        const {data, status} = await quanLyNguoiDungService.updateThongTinNguoiDungPost(userObj);
        if(status === STATUS_CODE.SUCCESS){
            noti('Cập nhật thông tin thành công', 'success');
            dispatch(getThongTinTaiKhoan(data.content))
        } else {
            noti('Cập nhật thông tin thất bại', 'error');
            console.log(status);
        }
    } catch(err){
        noti('Cập nhật thông tin thất bại', 'error');
        console.log(err);
    }
}

export const fetchLoaiNguoiDungAction = () => async () => {
    try{
        const {data, status} = await quanLyNguoiDungService.getDanhSachLoaiNguoiDung();
        if(status === STATUS_CODE.SUCCESS){
            return data.content
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}

export const fetchDanhSachNguoiDungAction = (keyword) => async(dispatch) => {
    try{
        const {data, status} = await quanLyNguoiDungService.getDanhSachNguoiDung(keyword);
        if(status === STATUS_CODE.SUCCESS){
            dispatch(getDanhSachUser(data.content))
        } else {
            console.log(status);
        }
    } catch(err){
        console.log(err);
    }
}

export const deleteNguoiDungAction = (taiKhoan) => async(dispatch) => {
    try{
        const {status} = await quanLyNguoiDungService.deleteNguoiDung(taiKhoan);
        if(status === STATUS_CODE.SUCCESS){
            noti('Xóa người dùng thành công', 'success');
            dispatch(fetchDanhSachNguoiDungAction(''))
        } else {
            noti('Xóa người dùng thất bại', 'error')
            console.log(status);
        }
    } catch(err){
        console.log(err);
        noti('Xóa người dùng thất bại', 'error');
    }
}

export const addNguoiDungAction = (userObj, history) => async(dispatch) => {
    try{
        const {status} = await quanLyNguoiDungService.themNguoiDung(userObj);
        if(status === STATUS_CODE.SUCCESS){
            noti('Thêm người dùng thành công', 'success');
            history.push('/admin/users')
        } else {
            noti('Thêm người dùng thất bại', 'error')
            console.log(status);
        }
    } catch(err){
        console.log(err);
        noti('Thêm người dùng thất bại', 'error');
    }
}