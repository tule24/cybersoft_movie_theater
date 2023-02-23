import { createSlice } from '@reduxjs/toolkit'
import {USER_LOGIN } from '../../utils/Constant/settingSystem';

const initialState = {
    danhSachPhongVe: {},
    arrGheDangDat: [],
    arrGheDaDat: [],
    arrGheKhachDat: [
        {maGhe: 47881}, 
        {maGhe: 47882}],
    tongTien: 0,
    activeKey: '1'
};

const QuanLyDatVeSlice = createSlice({
    name: 'QuanLyDatVeSlice',
    initialState,
    reducers: {
        getDanhSachPhongVe: (state, action) => {
            state.danhSachPhongVe = { ...action.payload };
            const { taiKhoan } = JSON.parse(localStorage.getItem(USER_LOGIN));
            state.arrGheDaDat = state.danhSachPhongVe.danhSachGhe?.filter(item => item.taiKhoanNguoiDat === taiKhoan);
        },
        updateDanhSachGheDangDat: (state, action) => {
            let index = state.arrGheDangDat.findIndex(item => item.maGhe === action.payload.maGhe);
            if (index !== -1) {
                state.arrGheDangDat.splice(index, 1);
                state.tongTien -= Math.round(action.payload.giaVe);
            } else {
                state.arrGheDangDat.push(action.payload);
                state.tongTien += Math.round(action.payload.giaVe);
            }
        },
        resetDanhSachGheDangDat: (state) => {
            state.arrGheDangDat = [];
            state.tongTien = 0;
        },
        changeActiveKey: (state, action) => {
            state.activeKey = action.payload;
        }
    }
})

const { actions, reducer } = QuanLyDatVeSlice;
export const { getDanhSachPhongVe, updateDanhSachGheDangDat, resetDanhSachGheDangDat, changeActiveKey } = actions;
export default reducer;


