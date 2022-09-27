import React from "react";
import { createSlice, Reducer } from '@reduxjs/toolkit';

// 초/중/종 선택
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

// 초성
export const selectFirst = createSlice({
  name: 'selectFirst',	// key
  initialState:{value:-1},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const firstAction = selectFirst.actions;

// 중성
export const selectMiddle = createSlice({
  name: 'selectMiddle',	// key
  initialState:{value:-1},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const middleAction = selectMiddle.actions;

// 종성
export const selectLast = createSlice({
  name: 'selectLast',	// key
  initialState:{value:0},	// 초기값
  reducers:{
    change:(state, action) =>{
      state.value = action.payload; // action에 값이 들어오면 자동으로 payload에 할당됨
    }
  }
});
export const lastAction = selectLast.actions;
