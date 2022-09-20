import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const signin: any = createAsyncThunk('signin', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.post(api.signin(), payload, {});
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface UserState {
  currentUser: {
    wallet_address: String;
    nickname: String;
    message: String;
    joinDate: String;
    ticket_count: Number;
  };
  isLogin: Boolean;
}

const initialState: UserState = {
  currentUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
  },
  isLogin: false,
};

export const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    checkLogin: state => {
      state.isLogin = true;
    },
  },
  extraReducers: {
    [signin.fulfilled]: state => {
      state.isLogin = true;
      console.log(state);
    },
    [signin.rejected]: state => {
      state.isLogin = false;
    },
  },
});

export { signin };

export const { checkLogin } = UserSlice.actions;

export default UserSlice.reducer;
