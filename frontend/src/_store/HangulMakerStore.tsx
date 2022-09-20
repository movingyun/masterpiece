import React from "react";
import { configureStore } from '@reduxjs/toolkit';
import selectReducer from '../_slice/HangulMakerSlice';

const store = configureStore({
  reducer:{
    select:selectReducer // select 이름으로 selectSlice의 reducers들이 하나의 reduce로 묶임
  }
});
export type TabState = ReturnType<typeof store.getState>;
export type TabDispatch = typeof store.dispatch;
export default store;