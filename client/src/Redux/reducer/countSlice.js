import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,
  likedProduct: [
  
  ]
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
      console.log(state.likedProduct[0].isLike)
    }
  },
})
export const { increaseCart, decreaseCart, favProduct } = ProductSlice.actions;
export const reducer = ProductSlice.reducer;
