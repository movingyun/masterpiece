import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const fetchGameData: any = createAsyncThunk('fetchGameData', async (payload: any, { rejectWithValue }) => {
  try {
    const res: any = await axios.post(api.fetchGameData(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const putGameLog: any = createAsyncThunk('putGameLog', async (payload: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.putGameLog(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface QuestionType {
  question: Array<String>;
}

export interface GameType {
  gameId: Number;
  questionOption: Array<QuestionType>;
  questionAnswer: Array<Number>;
}

const initialState: GameType = {
  gameId: 0,
  questionOption: [],
  questionAnswer: [],
};

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGameData.fulfilled]: (state, action) => {
      state.gameId = action.gameId;
      state.questionOption = action.questionOption;
      state.questionAnswer = action.questionAnswer;
    },
  },
});

export { fetchGameData, putGameLog };

export const {} = GameSlice.actions;

export default GameSlice.reducer;
