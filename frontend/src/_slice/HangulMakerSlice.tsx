import React from "react";
import { createSlice, Reducer } from '@reduxjs/toolkit';

export const selectTab = createSlice({
  name: 'selectTab',	// key
  initialState:{value:0},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const tabAction = selectTab.actions;

export const selectFirst = createSlice({
  name: 'selectFirst',	// key
  initialState:{value:-1},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const firstAction = selectTab.actions;

export const selectMiddle = createSlice({
  name: 'selectMiddle',	// key
  initialState:{value:-1},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const middleAction = selectTab.actions;

export const selectLast = createSlice({
  name: 'selectLast',	// key
  initialState:{value:0},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const lastAction = selectTab.actions;