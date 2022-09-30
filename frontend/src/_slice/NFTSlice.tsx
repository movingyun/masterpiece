import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

// like
const toggleLike: any = createAsyncThunk('toggleLike', async (payload: any, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.toggleLike(), payload);
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const fetchLike: any = createAsyncThunk('toggleLike', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.post(api.toggleLike(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// NFT
const fetchAllNFT: any = createAsyncThunk('fetchAllNFT', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchAllNFT(), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});
const fetchNFTDetail: any = createAsyncThunk('fetchNFTDetail', async (nftAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchNFTDetail(nftAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface NFT {
  imgUrl: String;
  nftTitle: String;
  nftPrice: String;
  nftCreatorNickname: String;
  lastPrice: String;
  nftOwnerNickname: String;
  nftTags: Array<String>;
  nftLike: Number;
  nftAddress: String;
}

export interface NFTState {
  NFTAll: Array<NFT>;
  currentNFT: NFT;
  likeState: Boolean;
  isLoading: Boolean;
}

const initialState: NFTState = {
  NFTAll: [],
  currentNFT: {
    imgUrl: '',
    nftTitle: '',
    nftPrice: '',
    nftCreatorNickname: '',
    lastPrice: '',
    nftOwnerNickname: '',
    nftTags: [],
    nftLike: 0,
    nftAddress: '',
  },
  likeState: false,
  isLoading: true,
};

export const NFTSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    toggleIsLoading: state => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchAllNFT.fulfilled]: (state, action) => {
      state.NFTAll = action.payload;
    },
    [fetchNFTDetail.fulfilled]: (state, action) => {
      state.currentNFT = action.payload;
    },
    [toggleLike.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [toggleLike.reject]: (state, action) => {
      state.isLoading = true;
    },
    [toggleLike.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchLike.fulfilled]: (state, action) => {
      state.likeState = action.payload;
      state.isLoading = true;
    },
  },
});

export { fetchAllNFT, fetchNFTDetail, toggleLike, fetchLike };

export const { toggleIsLoading } = NFTSlice.actions;

export default NFTSlice.reducer;
