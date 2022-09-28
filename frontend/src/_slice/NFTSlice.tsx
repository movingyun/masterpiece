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

export interface NFT {
  imgUrl: String;
  nftTitle: String;
  ntfPrice: String;
  nftCreatorNickname: String;
  lastPrice: String;
  nftOwnerNickname: String;
  nftTags: Array<String>;
  nftLike: Number;
}

export interface NFTState {
  NFTAll: Array<NFT>;
}

const initialState: NFTState = {
  NFTAll: [],
};

export const NFTSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllNFT.fulfilled]: (state, action) => {
      state.NFTAll = action.payload;
    },
  },
});

export { fetchAllNFT };

export const {} = NFTSlice.actions;

export default NFTSlice.reducer;
