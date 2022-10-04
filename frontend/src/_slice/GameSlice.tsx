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
  questionOption: Array<object>;
  questionAnswer: Array<Number>;
  gameLogSuccess: Boolean;
}

const initialState: GameType = {
  gameId: 0,
  questionOption: [
    {
      options: ['단미', '새론', '가람', '모들'],
    },
    {
      options: ['윤슬', '슈룹', '까미', '나봄'],
    },
    {
      options: ['마녘', '소리', '핀아', '노을'],
    },
    {
      options: ['즈문', '새라', '노량', '느루'],
    },
    {
      options: ['샛별', '한빛', '아미', '드레'],
    },
  ],
  questionAnswer: [0, 1, 1, 1, 1],
  gameLogSuccess: false,
};

export const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGameData.fulfilled]: (state, action) => {
      state.gameId = action.payload.gameId;
      state.questionOption = action.payload.questionOption;
      state.questionAnswer = action.payload.questionAnswer;
    },
    [putGameLog.fulfilled]: (state, action) => {
      state.gameLogSuccess = true;
    },
  },
});

export { fetchGameData, putGameLog };

export const {} = GameSlice.actions;

export default GameSlice.reducer;
