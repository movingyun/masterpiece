import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

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
};

export const NFTSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllNFT.fulfilled]: (state, action) => {
      state.NFTAll = action.payload;
    },
    [fetchNFTDetail.fulfilled]: (state, action) => {
      state.currentNFT = action.payload;
    },
  },
});

export { fetchAllNFT, fetchNFTDetail };

export const {} = NFTSlice.actions;

export default NFTSlice.reducer;
