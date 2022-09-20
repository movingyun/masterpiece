import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './store/UserSlice';

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
