import { configureStore } from '@reduxjs/toolkit';
import HangulReducer from '../_slice/HangulSlice';
import UserReducer from '../_slice/UserSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
    hangul: HangulReducer,
  },
});

export default store;
