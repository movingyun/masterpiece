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
const fetchUser: any = createAsyncThunk('fetchUser', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchUser(walletAddress));
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const fetchInventory: any = createAsyncThunk('fetchInventory', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchInventory(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface Hangul {
  hangulId: Number;
  quantity: Number;
  description: String;
  title: String;
}
export interface Inventory {
  consonant: Array<Hangul>;
  vowe: Array<Hangul>;
}

export interface UserState {
  currentUser: {
    wallet_address: String;
    nickname: String;
    message: String;
    joinDate: String;
    ticket_count: Number;
    imgUrl: String;
  };
  searchedUser: {
    wallet_address: String;
    nickname: String;
    message: String;
    joinDate: String;
    ticket_count: Number;
    imgUrl: String;
  };
  isLogin: Boolean;
  inventory: Inventory;
}

const initialState: UserState = {
  currentUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
    imgUrl: '',
  },
  searchedUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
    imgUrl: '',
  },
  isLogin: false,
  inventory: {
    consonant: [],
    vowe: [],
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUser: state => {
      const localUserData = window.localStorage.getItem('currentUser');
      if (!localUserData) {
        throw new Error('no local user data');
      }
      state.currentUser = JSON.parse(localUserData);
    },
    checkLogin: state => {
      if (window.localStorage.getItem('currentUser')) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    logout: state => {
      state.currentUser = {
        wallet_address: '',
        nickname: '',
        message: '',
        joinDate: '',
        ticket_count: 0,
        imgUrl: '',
      };
      window.localStorage.removeItem('currentUser');
      state.isLogin = false;
    },
  },
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.currentUser = action.payload;
      window.localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
    [signin.rejected]: state => {
      state.isLogin = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.searchedUser = action.payload;
    },
    [fetchInventory.fulfilled]: (state, action) => {
      state.inventory = action.payload;
    },
  },
});

export { signin, fetchUser, fetchInventory };

export const { getCurrentUser, checkLogin, logout } = UserSlice.actions;

export default UserSlice.reducer;
