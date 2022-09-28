import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const fetchSaleHistory: any = createAsyncThunk('fetchSaleHistory', async (nftAddress: String, { rejectWithValue }) => {
  try {
    const res: any = await axios.get(api.fetchSaleHistory(nftAddress), {});
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export interface SaleHistoryType {
  saleHistory: {
    sellerWalletAddress: String;
    buyerWalletAddress: String;
    datetime: String;
    price: Number;
  };
}

export interface SaleHistoryAllState {
  saleHistoryAll: Array<SaleHistoryType>;
}

const initialState: SaleHistoryAllState = {
  saleHistoryAll: [],
};

export const SaleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSaleHistory.fulfilled]: (state, action) => {
      state.saleHistoryAll = action.payload;
    },
  },
});

export { fetchSaleHistory };

export const {} = SaleSlice.actions;

export default SaleSlice.reducer;
