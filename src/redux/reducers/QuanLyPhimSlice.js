import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    arrPhim: [],
    phimDetail: {},
};

const QuanLyPhimSlice = createSlice({
    name: 'QuanLyPhimSlice',
    initialState,
    reducers: {
        getDataPhim: (state, action) => {
            state.arrPhim = [...action.payload];
        },
        getPhimDetail: (state, action) => {
            state.phimDetail = { ...action.payload };
        }
    }
})

const { actions, reducer } = QuanLyPhimSlice;
export const { getDataPhim, getPhimDetail } = actions;
export default reducer;

