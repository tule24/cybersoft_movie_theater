import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    arrLichChieuHeThongRap: [],
    lichChieuPhimDetail: {}
}

const QuanLyRapSlice = createSlice({
    name:'QuanLyRapSlice',
    initialState,
    reducers: {
        getLichChieuHeThongRap: (state, action) => {
            state.arrLichChieuHeThongRap = [...action.payload];
        },
        getLichChieuPhimDetail: (state, action) => {
            state.lichChieuPhimDetail = {...action.payload};
        }
    }
})

const {actions, reducer} = QuanLyRapSlice;
export const {getLichChieuHeThongRap, getLichChieuPhimDetail} = actions;
export default reducer;

