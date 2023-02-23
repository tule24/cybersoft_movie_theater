import {createSlice} from '@reduxjs/toolkit'
import {USER_LOGIN } from '../../utils/Constant/settingSystem';

let user= {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
    userLogin: user,
    thongTinTaiKhoan: {},
    arrUser: []
};

const QuanLyNguoiDungSlice = createSlice({
    name:'QuanLyNguoiDungSlice',
    initialState,
    reducers: {
        getDataUser: (state, action) => {
            state.userLogin = {...action.payload};
        },
        getThongTinTaiKhoan: (state, action) => {
            state.thongTinTaiKhoan = {...action.payload};
        },
        getDanhSachUser: (state, action) => {
            state.arrUser = [...action.payload];
        }

    }
})

const {actions, reducer} = QuanLyNguoiDungSlice;
export const {getDataUser, getThongTinTaiKhoan, getDanhSachUser} = actions;
export default reducer;


