import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const fetchConsonant: any = createAsyncThunk('fetchConsonant', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchConsonant(walletAddress));
    console.log(res);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const pickConsonant: any = createAsyncThunk('pickConsonant', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.pickConsonant(), payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface HangulState {
  consonant: Array<Number>;
  pickConsonantResult: Array<{
    id: Number;
    description: String;
    title: String;
    letter: String;
    first: Boolean;
    last: Boolean;
    middle: Boolean;
  }>;
}

const initialState: HangulState = {
  consonant: [],
  pickConsonantResult: [],
};

export const HangulSlice = createSlice({
  name: 'hangul',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConsonant.fulfilled]: (state, action) => {
      state.consonant = action.payload;
    },
    [pickConsonant.fulfilled]: (state, action) => {
      state.pickConsonantResult = action.payload;
    },
  },
});

export { fetchConsonant, pickConsonant };

export const {} = HangulSlice.actions;

export default HangulSlice.reducer;
