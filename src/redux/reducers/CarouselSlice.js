import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    arrCarousel: []
};

const CarouselSlice = createSlice({
    name: 'carouselSlice',
    initialState,
    reducers: {
        getDataCarousel: (state, action) => {
            state.arrCarousel = [...action.payload];
        }
    }
})

const {actions, reducer} = CarouselSlice;
export const {getDataCarousel} = actions;
export default reducer;

