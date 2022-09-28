import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../_slice/UserSlice';
import DecoReducer from '../_slice/DecorateHangulSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
    deco: DecoReducer,
  },
});

export default store;
