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

export interface HangulState {
  consonant: Array<Number>;
}

const initialState: HangulState = {
  consonant: [],
};

export const HangulSlice = createSlice({
  name: 'hangul',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConsonant.fulfilled]: (state, action) => {
      state.consonant = action.payload;
    },
  },
});

export { fetchConsonant };

export const {} = HangulSlice.actions;

export default HangulSlice.reducer;
