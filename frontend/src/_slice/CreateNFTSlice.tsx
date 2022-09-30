import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FormData from 'form-data';

import api from '../api/api';

const countLetter: any = createAsyncThunk('countLetter', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.post(api.countLetter(), payload, {});
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const createNFT: any = createAsyncThunk('createNFT', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.post(api.createNFT(), payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const exhaustLetter: any = createAsyncThunk('exhaustLetter', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.exhaustLetter(), payload, {});
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});



const initialState = {
  NFTBlob: new Blob(),
  NFTBlobURL: '',
  title: '하이',
  description: '그래',
  tag: ['세종대왕', '킹왕짱'],
  mintingData: new FormData(),
  checkLetterAPI: {},
  countLetterChecked: false,
  mintingCompleted: false,
};

const CreateNFTSlice = createSlice({
  name: 'createNFT',
  initialState,
  reducers: {
    NFTBlob(state, action) {
      state.NFTBlob = action.payload;
    },
    NFTBlobURL(state, action) {
      state.NFTBlobURL = action.payload;
    },
    title(state, action) {
      state.title = action.payload;
    },
    description(state, action) {
      state.description = action.payload;
    },
    tag(state, action) {
      state.tag = action.payload;
    },
    mintingData(state, action) {
      state.mintingData = action.payload;
    },
    checkLetterAPI(state, action) {
      state.checkLetterAPI = action.payload;
    },
    countLetterChecked(state, action) {
      state.countLetterChecked = action.payload;
    },
    mintingCompleted(state, action) {
      state.mintingCompleted = action.payload;
    },
  },
  extraReducers: {
    [countLetter.fullfiled]: (state, action) => {
      if (action.payload) {
        console.log("counterLetter 성공")
        state.countLetterChecked = true;
      } else {
        alert('Not enough letters');
      }
    },
    [createNFT.fullfiled]: (state, action) => {
      exhaustLetter(state.checkLetterAPI);
    },
    [createNFT.rejected]: state => {
      alert('Cannot Mint NFT properly');
    },
    [exhaustLetter.fullfiled]: (state, action) => {
      state.mintingCompleted = true;
    },
  },
});

export { countLetter, createNFT, exhaustLetter }; 
export const createNFTActions = CreateNFTSlice.actions;

export default CreateNFTSlice.reducer;
