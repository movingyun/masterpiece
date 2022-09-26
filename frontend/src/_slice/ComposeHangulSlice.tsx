import React from "react";
import { createSlice, Reducer } from '@reduxjs/toolkit';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';

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
  initialState:{value: ["space", "enter"]},	// 초기값
  reducers:{
    reset:(state, action) =>{
      state.value = ["space", "enter"];
    },
    push:(state, action) =>{
      state.value.push(action.payload);
    },
    add:(state, action) =>{
      state.value.splice(action.payload.index, 0, action.payload.dragValueState);
    },
    delete:(state, action) =>{
      state.value.splice(action.payload.index, 1);
    }
  }
});
export const areaSyllableAction = areaSyllable.actions;

// 제작중인 문장
export const areaSentence = createSlice({
  name: 'areaSentence',	// key
  initialState:{value:["space", "enter", "객"]},	// 초기값
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
    compose:(state, action) =>{
      state.value[action.payload.index]--;
    },
    discompose:(state, action) =>{
      state.value[action.payload.index]++;
    },
  }
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
    compose:(state, action) =>{
      state.value[action.payload.index]--;
    },
    discompose:(state, action) =>{
      state.value[action.payload.index]++;
    },
  }
});
export const vowelCountAction = vowelCount.actions;