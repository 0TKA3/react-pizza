import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

function calculateTotalPrice(state) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const findItem = state.items.find((obj) => obj.id === payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }
      calculateTotalPrice(state);
    },
    minusItem(state, { payload }) {
      const findItem = state.items.find((obj) => obj.id === payload);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        }
      }
      calculateTotalPrice(state);
    },
    removeItem(state, { payload }) {
      state.items = state.items.filter((obj) => obj.id !== payload);
      if (state.items.length > 0) {
        calculateTotalPrice(state);
      } else {
        state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
