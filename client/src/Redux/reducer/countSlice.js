import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    count:0 
}

const ProductSlice = createSlice({
  name: 'addCart',
  initialState,
  reducers: {
    increaseCart:(state,actions)=>{
       state.count+=1
    },
    decreaseCart:(state,actions)=>{
      state.count-=1
    }
  },
})
export const { increaseCart,decreaseCart } = ProductSlice.actions;
export const reducer = ProductSlice.reducer;
