import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    results: [],
}

const SearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchProduct:(state,action)=>{
        state.results.push(action.payload)
    }
},
})
export const { searchKeyword,searchProduct } = SearchSlice.actions;
export default SearchSlice.reducer;