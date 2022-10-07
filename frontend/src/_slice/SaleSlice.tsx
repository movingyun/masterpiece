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
  isMain: Boolean;
}

const initialState: SaleHistoryAllState = {
  saleHistoryAll: [],
  isMain: false,
};

export const SaleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setIsMain: state => {
      state.isMain = !state.isMain;
    },
  },
  extraReducers: {
    [fetchSaleHistory.fulfilled]: (state, action) => {
      const history = action.payload;
      for (let i = 0; i < history.length; i++) {
        const fullDate = new Date(history[i].datetime);
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth() + 1;
        const date = fullDate.getDate();
        const hour = fullDate.getHours();
        const min = fullDate.getMinutes();
        const sec = fullDate.getSeconds();
        const time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
        history[i].datetime = time;
      }
      state.saleHistoryAll = history;
    },
  },
});

export { fetchSaleHistory };

export const { setIsMain } = SaleSlice.actions;

export default SaleSlice.reducer;
