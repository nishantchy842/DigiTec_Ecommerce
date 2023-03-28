import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
  isLike: false,
  likedProduct: []
}

const ProductSlice = createSlice({
  name: 'addCart',
  initialState,
  reducers: {
    increaseCart: (state, actions) => {
      state.count += 1
    },
    decreaseCart: (state, actions) => {
      state.count -= 1
    },
    favProduct: (state, action) => {
      state.isLike = !state.isLike

      if (state.isLike === true) {
        state.likedProduct.push(action.payload)
      }
     
    }
  },
})
export const { increaseCart, decreaseCart, favProduct } = ProductSlice.actions;
export const reducer = ProductSlice.reducer;
