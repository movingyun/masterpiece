import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const fetchConsonant: any = createAsyncThunk('fetchConsonant', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchConsonant(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const pickConsonant: any = createAsyncThunk('pickConsonant', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.pickConsonant(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const pickVowel: any = createAsyncThunk('pickVowel', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.pickVowel(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const fetchFirst: any = createAsyncThunk('fetchFirst', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchFirst(), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface HangulState {
  consonant: Object;
  pickSuccess: Boolean;
  pickResult: Array<{
    id: Number;
    description: String;
    title: String;
    letter: String;
    first: Boolean;
    last: Boolean;
    middle: Boolean;
  }>;
  first: Array<Object>;
}

const initialState: HangulState = {
  consonant: [],
  pickSuccess: false,
  pickResult: [],
  first: [],
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
      if (action.payload === 'No Ticket') {
        state.pickSuccess = false;
        state.pickResult = [
          {
            id: 0,
            description: '',
            title: '',
            letter: '',
            first: false,
            last: false,
            middle: false,
          },
        ];
      } else {
        state.pickSuccess = true;
        state.pickResult = action.payload;
      }
    },
    [pickVowel.fulfilled]: (state, action) => {
      if (action.payload === 'No Ticket') {
        state.pickSuccess = false;
        state.pickResult = [
          {
            id: 0,
            description: '',
            title: '',
            letter: '',
            first: false,
            last: false,
            middle: false,
          },
        ];
      } else {
        state.pickSuccess = true;
        state.pickResult = action.payload;
      }
    },
    [fetchFirst.fulfilled]: (state, action) => {
      state.first = action.payload;
    },
  },
});

export { fetchConsonant, pickConsonant, pickVowel, fetchFirst };

export const {} = HangulSlice.actions;

export default HangulSlice.reducer;
