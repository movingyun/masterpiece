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
  NFTBlob: '',
  title: '',
  description: '',
  tag: [],
  mintingData: new FormData(),
  decomposeHangul: [],
  mintingCompleted: false,
};

const CreateNFTSlice = createSlice({
  name: 'createNFT',
  initialState,
  reducers: {
    NFTBlob(state, action) {
      state.NFTBlob = action.payload;
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
    decomposeHangul(state, action) {
      state.decomposeHangul = action.payload;
    },
    mintingCompleted(state, action) {
      state.mintingCompleted = action.payload;
    },
  },
  extraReducers: {
    [countLetter.fullfiled]: (state, action) => {
      if (action.payload === 'true') {
        createNFT(state.mintingData);
      } else {
        alert('Not enough letters');
      }
    },
    [countLetter.rejected]: state => {},
    [createNFT.fullfiled]: (state, action) => {
      exhaustLetter(state.decomposeHangul);
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
