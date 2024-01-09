// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "data/fetch",
  async ({
    categoryId,
    sortType,
    sortOrder,
    searchValue,
    sortList,
  }: {
    categoryId: number;
    sortType: number;
    sortOrder: string;
    searchValue: string;
    sortList: string[];
  }) => {
    const link =
      "https://658ee58f2871a9866e79ff4c.mockapi.io/items" +
      `?sortBy=${sortList[sortType]}&order=${sortOrder}` +
      (categoryId ? `&category=${categoryId}` : "") +
      (searchValue ? `&search=${searchValue}` : "");

    const response = await axios.get(link);

    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setData: (state, { paylaod }: any) => {
      state.data = paylaod;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
