import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer/adminSlice';
import userSlice from './reducer/userSlice';

const store = configureStore({
    reducer: {
        product: reducer,
        user:userSlice
    },
  });
 
  export default store;