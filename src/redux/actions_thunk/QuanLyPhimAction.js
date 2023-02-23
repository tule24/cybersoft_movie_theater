import { quanLyPhimService } from '../../services/QuanLyPhimServices';
import { STATUS_CODE } from '../../utils/Constant/settingSystem';
import { noti } from '../../utils/noti';
import {getDataPhim, getPhimDetail} from '../reducers/QuanLyPhimSlice'

export const fetchDataPhimAction = (keyword) => async (dispatch) => {
    try {
        const { data, status } = await quanLyPhimService.getDanhSachPhim(keyword);
        if (status === STATUS_CODE.SUCCESS) {
            dispatch(getDataPhim(data.content));
        } else {
            console.log(status);
        }
    } catch (err) {
        console.log(err);
    }
}

export const fectchPhimDetailAction = (id) => async (dispatch) => {
    try {
        const { data, status } = await quanLyPhimService.getThongTinPhim(id);
        if (status === STATUS_CODE.SUCCESS) {
            dispatch(getPhimDetail(data.content));
        } else {
            console.log(status);
        }
    } catch (err) {
        console.log(err);
    }
}

export const uploadPhimAction = (formData) => async (dispatch) => {
    try {
        const { status } = await quanLyPhimService.themPhim(formData);
        if (status === STATUS_CODE.SUCCESS) {
            noti('Upload Phim thành công', 'success');
        } else {
            console.log(status);
            noti('Upload Phim thất bại', 'error');
        }
    } catch (err) {
        console.log(err);
        noti('Upload Phim thất bại', 'error');
    }
}

export const updatePhimAction = (formData, history) => async (dispatch) => {
    try {
        const { status } = await quanLyPhimService.updatePhim(formData);
        if (status === STATUS_CODE.SUCCESS) {
            noti('Update Phim thành công', 'success');
            history.push('/admin/films')
        } else {
            console.log(status);
            noti('Update Phim thất bại', 'error');
        }
    } catch (err) {
        console.log(err);
        noti('Update Phim thất bại', 'error');
    }
}

export const deletePhimAction = (maPhim) => async (dispatch) => {
    try {
        const { status } = await quanLyPhimService.deletePhim(maPhim);
        if (status === STATUS_CODE.SUCCESS) {
            noti('Delete Phim thành công', 'success');
            dispatch(fetchDataPhimAction(''));
        } else {
            console.log(status);
            noti('Delete Phim thất bại', 'error');
        }
    } catch (err) {
        console.log(err);
        noti('Delete Phim thất bại', 'error');
    }
}
