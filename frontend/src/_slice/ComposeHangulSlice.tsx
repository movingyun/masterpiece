import React from "react";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const getFisrt: any = createAsyncThunk('getFisrt', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.getFisrt(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const getMiddle: any = createAsyncThunk('getMiddle', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.getMiddle(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const getLast: any = createAsyncThunk('getLast', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.getLast(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const getConsonant: any = createAsyncThunk('getConsonant', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.getConsonant(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
export { getFisrt, getMiddle, getLast, getConsonant };

// 드래그중인 값
export const dragValue = createSlice({
  name: 'dragValue',
  initialState:{value:""},
  reducers:{
    setValue:(state, action) =>{
      state.value = action.payload;
    }
  }
});
export const dragValueAction = dragValue.actions;

// 드래그중인 areaIndex
export const areaIndex = createSlice({
  name: 'areaIndex',
  initialState:{value:-1},
  reducers:{
    setValue:(state, action) =>{
      state.value = action.payload;
    }
  }
});
export const areaIndexAction = areaIndex.actions;

// 드래그중인 elementIndex
export const elementIndex = createSlice({
  name: 'elementIndex',
  initialState:{value:-1},
  reducers:{
    setValue:(state, action) =>{
      state.value = action.payload;
    }
  }
});
export const elementIndexAction = elementIndex.actions;

// 제작된 음절
export const areaSyllable = createSlice({
  name: 'areaSyllable',	// key
  initialState:{value: [" ", "\n"]},	// 초기값
  // initialState:{value: [" ", "\n","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ","ㄲ","ㄸ","ㅆ","ㅉ","ㅃ","ㄵ","ㄻ","ㄼ","ㄾ","ㅀ","ㄳ","ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ",
  // "ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ","ㄲ","ㄸ","ㅆ","ㅉ","ㅃ","ㄵ","ㄻ","ㄼ","ㄾ","ㅀ","ㄳ","ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ"]},
  reducers:{
    reset:(state, action) =>{
      state.value = [" ", "\n"];
    },
    push:(state, action) =>{
      state.value.push(action.payload);
    },
    add:(state, action) =>{
      state.value.splice(action.payload.index, 0, action.payload.dragValueState);
    },
    delete:(state, action) =>{
      console.log(action.payload.index, state.value[action.payload.index],
        state.value[action.payload.index+1]);
      state.value.splice(action.payload.index, 1);
      console.log(state.value[action.payload.index]);
    }
  }
});
export const areaSyllableAction = areaSyllable.actions;

// 제작중인 문장
export const areaSentence = createSlice({
  name: 'areaSentence',	// key
  initialState:{value:[""]},	// 초기값
  reducers:{
    reset:(state, action) =>{
      state.value = [""];
    },
    add:(state, action) =>{
      console.log(action.payload);
      state.value.splice(action.payload.index+1, 0, action.payload.dragValueState);
    },
    delete:(state, action) =>{
      state.value.splice(action.payload.index, 1);
    },
    move:(state, action) =>{
      const finish = action.payload.finishIndex;
      let start = action.payload.startIndex;
      console.log(`start: ${start} / finish : ${finish}`);
      state.value.splice(finish+1, 0, action.payload.dragValueState);
      if(finish<start){
        start++;
      }
      state.value.splice(start, 1);
    },
  }
});
export const areaSentenceAction = areaSentence.actions;

// 자음 count
export const consonantCount = createSlice({
  name: 'consonantCount',
  // backendAPI
  initialState:{value:[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]},
  reducers:{
    init:(state, action) =>{
      // backendAPI
      state.value = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    },
    // setUserCount: (state, action) => {
    //   state.value = getConsonant(action.payload.walletAddress);
    // },
    compose:(state, action) =>{
      state.value[action.payload.index]--;
    },
    discompose:(state, action) =>{
      state.value[action.payload.index]++;
    },
  },
  extraReducers: {
    [getConsonant.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [getConsonant.rejected]: state => {
      state.value = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    },
  },
});
export const consonantCountAction = consonantCount.actions;

// 모음 count
export const vowelCount = createSlice({
  name: 'vowelCount',
  // backendAPI
  initialState:{value:[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]},
  reducers:{
    init:(state, action) =>{
      // backendAPI
      state.value = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    },
    // setUserCount: (state, action) => {
    //   // const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
    //   state.value = getMiddle(action.payload.walletAddress);
    // },
    compose:(state, action) =>{
      state.value[action.payload.index]--;
    },
    discompose:(state, action) =>{
      state.value[action.payload.index]++;
    },
  },
  extraReducers: {
    [getMiddle.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
    [getMiddle.rejected]: state => {
      state.value = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    },
  },
});
export const vowelCountAction = vowelCount.actions;