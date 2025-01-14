import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // 其他reducer
  },
});