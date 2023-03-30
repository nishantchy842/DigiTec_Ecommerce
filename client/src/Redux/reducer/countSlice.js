import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  total: 0,
  addToCart: []
}

const ProductSlice = createSlice({
  name: 'addCart',
  initialState,
  reducers: {
    increaseCart: (state, actions) => {
      state.total += 1
    },
    decreaseCart: (state, actions) => {
      state.total -= 1
    },
    favProduct: (state, action) => {
  
      const { payload } = action;
      const existingItemIndex = state.addToCart.findIndex(
        (item) => item._id === payload._id
      );
      if (existingItemIndex === -1) {
        state.addToCart.push({ ...payload, count: 1 });
      } else {
        state.addToCart[existingItemIndex].count++;
      }
      state.total++;
    },
    removeProduct: (state, action) => {
      const { payload } = action;
      const existingItemIndex = state.addToCart.findIndex(
        (item) => item._id === payload._id
      );
      if (existingItemIndex !== -1) {
        state.addToCart[existingItemIndex].count--;
        state.total--;
        if (state.addToCart[existingItemIndex].count === 0) {
          state.addToCart.splice(existingItemIndex, 1);
        }
      }
    }
  },
})
export const { increaseCart, decreaseCart, favProduct,removeProduct } = ProductSlice.actions;
export const reducer = ProductSlice.reducer;
