import { configureStore } from '@reduxjs/toolkit';
import userApi from './apis/userApi'; // userApi'yi varsayılan olarak import et
import blogApi from "./apis/blogApi"
import authReducer from "../features/auth/authSlice"
import adminApi from './apis/adminApi';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer, // userApi'yi reducer'a ekle
        [blogApi.reducerPath]: blogApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,

        auth: authReducer, // authSlice'ı reducer'a ekle
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, blogApi.middleware,adminApi.middleware), // userApi middleware'ini ekle
});

export default store; // store'u varsayılan olarak dışa aktar
