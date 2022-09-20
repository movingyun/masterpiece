import React from "react";
import { createSlice } from '@reduxjs/toolkit';

const selectSlice = createSlice({
  name: 'selectSlice',	// key
  initialState:{value:0},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});

export const { change } = selectSlice.actions;

export default selectSlice.reducer;