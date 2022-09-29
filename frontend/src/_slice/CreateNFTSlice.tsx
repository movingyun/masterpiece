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
  },
  extraReducers: {
    [countLetter.fullfiled]: (state, action) => {
      createNFT(state.mintingData);

    },
    [countLetter.rejected]: state => {

    },
    [createNFT.fullfiled]: (state, action) => {
      // exhaustLetter(///풀어해친);
    },
    [createNFT.rejected]: state => {},
  },
});

export { countLetter, createNFT, exhaustLetter }; 
export const createNFTActions = CreateNFTSlice.actions;

export default CreateNFTSlice.reducer;
