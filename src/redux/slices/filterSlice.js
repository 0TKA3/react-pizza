import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortType: 0,
    sortOrder: 'desc',
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId: (state,{payload}) => {
            state.categoryId = payload
        },
        setSortType: (state,{payload}) => {
            state.sortType = payload
        },
        setSortOrder: (state,{payload}) => {
            state.sortOrder = payload
        },
    }
})

export const {setCategoryId, setSortType,setSortOrder} = filterSlice.actions


export default filterSlice.reducer