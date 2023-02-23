import { connection } from '../../index';
import { quanLyDatVeService } from "../../services/QuanLyDatVeServices";
import { STATUS_CODE } from "../../utils/Constant/settingSystem";
import { noti } from '../../utils/noti';
import { setLoading } from '../reducers/LoadingSlice';
import { changeActiveKey, getDanhSachPhongVe, resetDanhSachGheDangDat, updateDanhSachGheDangDat } from "../reducers/QuanLyDatVeSlice";
import { getThongTinNguoiDungAction } from './QuanLyNguoiDungAction';

export const fetchDanhSachPhongVeAction = (maLichChieu) => async (dispatch) => {
    try {
        const { data, status } = await quanLyDatVeService.getDanhSachPhongVe(maLichChieu);
        if (status === STATUS_CODE.SUCCESS) {
            dispatch(getDanhSachPhongVe(data.content));
        } else {
            console.log(status);
        }
    } catch (err) {
        console.log(err);
    }
}

export const postGheDangDatAction = (ghe, maLichChieu) => async (dispatch, getState) => {
    try{
        await dispatch(updateDanhSachGheDangDat(ghe));
        let {arrGheDangDat} = getState().QuanLyDatVeReducer;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        arrGheDangDat = JSON.stringify(arrGheDangDat);
        connection.invoke('datGhe', taiKhoan, arrGheDangDat, maLichChieu);
    } catch(err){
        console.log(err);
    }
}

export const datVeAction = (thongTinDatVe) => async (dispatch) => {
    dispatch(setLoading(true));
    let notiContent = { content: '', status: '' }
    try {
        const { status } = await quanLyDatVeService.postDatVe(thongTinDatVe);
        if (status === STATUS_CODE.SUCCESS) {
            notiContent.content = 'Đặt vé thành công';
            notiContent.status = 'success'
        } else {
            console.log(status);
            notiContent.content = 'Đặt vé thất bại';
            notiContent.status = 'error'
        }

    } catch (err) {
        console.log(err);
        notiContent.content = 'Đặt vé thất bại';
        notiContent.status = 'error'
    }
    await dispatch(fetchDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
    dispatch(resetDanhSachGheDangDat());
    noti(notiContent.content, notiContent.status);
    dispatch(setLoading(false));
    dispatch(getThongTinNguoiDungAction());
    dispatch(changeActiveKey('2'));
}

export const taoLichChieuAction = (thongTinLichChieu) => async (dispatch) => {
    try{
        const {status} = await quanLyDatVeService.taoLichChieu(thongTinLichChieu);
        if(status === STATUS_CODE.SUCCESS){
            noti('Tạo lịch chiếu thành công', 'success');
        } else {
            noti('Tạo lịch chiếu thất bại', 'error');
        }
    } catch(err){
        console.log(err);
        noti('Tạo lịch chiếu thất bại', 'error');
    }
}