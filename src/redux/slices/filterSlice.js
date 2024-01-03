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
        setFilters: (state,{payload}) => {
            state.categoryId = Number(payload.categoryId)
            state.sortType = Number(payload.sortType)
            state.sortOrder =  payload.sortOrder
        }
    }
})

export const {setCategoryId, setSortType,setSortOrder,setFilters} = filterSlice.actions


export default filterSlice.reducer