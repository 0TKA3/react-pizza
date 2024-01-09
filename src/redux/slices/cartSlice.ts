import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types/ProductType";

type StateType = {
  totalPrice: number;
  items: ProductType[];
};

const initialState: StateType = {
  totalPrice: 0,
  items: [],
};

function calculateTotalPrice(state: StateType) {
  state.totalPrice = state.items.reduce((sum: number, obj: ProductType) => {
    if (obj.count) {
      return obj.price * obj.count + sum;
    } else {
      return 0;
    }
  }, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const findItem = state.items.find((obj: ProductType) => obj.id === payload.id);

      if (findItem && findItem.count) {
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
      if (findItem && findItem.count) {
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
