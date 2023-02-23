import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    isLoading: false
};

const LoadingSlice = createSlice({
    name: 'LoadingSlice',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})

const {actions, reducer} = LoadingSlice;
export const {setLoading} = actions;
export default reducer;