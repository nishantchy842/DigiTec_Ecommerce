import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer/adminSlice';
import userSlice from './reducer/userSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";




const persistConfig = {
    key: "root",
    storage,
    blacklist: ["location"],
  };


const reducers= combineReducers({

    product: reducer,
    user: userSlice

});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
