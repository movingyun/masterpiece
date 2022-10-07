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

const fetchNFTOwner: any = createAsyncThunk('fetchNFTOwner', async (nftAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchNFTOwner(nftAddress), {});
    console.log('fetchNFTOwner');
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const searchNFT: any = createAsyncThunk('searchNFT', async (payload: any, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.searchNFT(payload.category, payload.keyword), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const possessionNFT: any = createAsyncThunk('possessionNFT', async (payload, { rejectWithValue }) => {
  try {
    const res: any = await axios.put(api.possessionNFT(), payload, {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface NFT {
  imgUrl: string;
  nftTitle: String;
  nftPrice: String;
  nftCreatorNickname: String;
  lastPrice: String;
  nftOwnerNickname: String;
  nftTags: Array<String>;
  nftLike: Number;
  nftAddress: String;
  nftDescription: String;
  tokenId: String;
  isSale: Boolean;
}

export interface NFTState {
  NFTAll: Array<NFT>;
  searchedNFT: Array<NFT>;
  category: String;
  keyword: String;
  isSearch: Boolean;
  currentNFT: NFT;
  nftOwnerWallet: String;
  likeState: Boolean;
  isLoading: Boolean;
}

const initialState: NFTState = {
  NFTAll: [],
  searchedNFT: [],
  category: 'titlecontent',
  keyword: '',
  isSearch: false,
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
    nftDescription: '',
    tokenId: '',
    isSale: false,
  },
  nftOwnerWallet: '',
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
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
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
    [fetchNFTOwner.fulfilled]: (state, action) => {
      state.nftOwnerWallet = action.payload.walletAddress;
    },
    [searchNFT.fulfilled]: (state, action) => {
      state.searchedNFT = action.payload;
    },
    [possessionNFT.fulfilled]: (state, action) => {
      state.currentNFT.isSale = false;
    },
  },
});

export { fetchAllNFT, fetchNFTDetail, toggleLike, fetchLike, fetchNFTOwner, searchNFT, possessionNFT };

export const { toggleIsLoading, setIsSearch, setKeyword, setCategory } = NFTSlice.actions;

export default NFTSlice.reducer;
