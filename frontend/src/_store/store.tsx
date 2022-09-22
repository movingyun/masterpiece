import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../_slice/UserSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
