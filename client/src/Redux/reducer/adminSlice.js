import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    total: 0, 
    products:[],
    quantity:0
}

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct:(state,actions)=>{
       state.products = actions.payload
       state.total+=1
       state.quantity = state.quantity+actions.payload.Quntity
    }
  },
})
export const { addProduct } = ProductSlice.actions;
export const reducer = ProductSlice.reducer;
