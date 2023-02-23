import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer/adminSlice';

const store = configureStore({
    reducer: {
        product: reducer,
    },
  });
 
  export default store;