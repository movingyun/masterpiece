import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';
import { NFT } from './NFTSlice';

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
    console.log(res.data);
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

const fetchCollected: any = createAsyncThunk('fetchCollected', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchCollected(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const fetchCreated: any = createAsyncThunk('fetchCreated', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchCreated(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const fetchFavorite: any = createAsyncThunk('fetchFavorite', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchFavorite(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const fetchOnsale: any = createAsyncThunk('fetchOnsale', async (walletAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchOnsale(walletAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const editUser: any = createAsyncThunk('editUser', async (payload, { rejectWithValue }) => {
  try {
    console.log(payload);
    const res: any = await axios.put(api.editUser(), payload, { headers: { 'Content-Type': 'multipart/form-data' } });
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const fetchTicket: any = createAsyncThunk('fetchTicket', async (walletAddress: string, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchTicket(walletAddress), {});
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
    profileImage: String;
  };
  searchedUser: {
    wallet_address: String;
    nickname: String;
    message: String;
    joinDate: String;
    ticket_count: Number;
    profileImage: String;
  };
  isLogin: Boolean;
  inventory: Inventory;
  collected: Array<NFT>;
  created: Array<NFT>;
  favorite: Array<NFT>;
  onsale: Array<NFT>;
  ticket: Number;
}

const initialState: UserState = {
  currentUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
    profileImage: '',
  },
  searchedUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
    profileImage: '',
  },
  isLogin: false,
  inventory: {
    consonant: [],
    vowe: [],
  },
  collected: [],
  created: [],
  favorite: [],
  onsale: [],
  ticket: 0,
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
        profileImage: '',
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
    [fetchCollected.fulfilled]: (state, action) => {
      state.collected = action.payload;
    },
    [fetchCreated.fulfilled]: (state, action) => {
      state.created = action.payload;
    },
    [fetchFavorite.fulfilled]: (state, action) => {
      state.favorite = action.payload;
    },
    [fetchOnsale.fulfilled]: (state, action) => {
      state.onsale = action.payload;
    },
    [fetchTicket.fulfilled]: (state, action) => {
      state.ticket = action.payload.quantity;
    },
  },
});

export {
  signin,
  fetchUser,
  fetchInventory,
  fetchCollected,
  fetchCreated,
  fetchFavorite,
  fetchOnsale,
  editUser,
  fetchTicket,
};

export const { getCurrentUser, checkLogin, logout } = UserSlice.actions;

export default UserSlice.reducer;
