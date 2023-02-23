import { configureStore } from "@reduxjs/toolkit";
import CarouselReducer from './reducers/CarouselSlice'
import QuanLyPhimReducer from './reducers/QuanLyPhimSlice'
import QuanLyRapReducer from './reducers/QuanLyRapSlice'
import QuanLyNguoiDungReducer from './reducers/QuanLyNguoiDungSlice'
import QuanLyDatVeReducer from './reducers/QuanLyDatVeSlice'
import QuanLyLoading from './reducers/LoadingSlice'

export const store = configureStore({
    reducer: {
        CarouselReducer,
        QuanLyPhimReducer,
        QuanLyRapReducer,
        QuanLyNguoiDungReducer,
        QuanLyDatVeReducer,
        QuanLyLoading
    }
})