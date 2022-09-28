import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  NFTBlob: '',
  title: '',
  description: '',
  tag: [],
};

const CreateNFTSlice = createSlice({
  name: 'createNFT',
  initialState,
  reducers: {
    NFTBlob(state, action) {
      state.NFTBlob = action.payload;
    },
    title(state, action) {
      state.title = action.payload;
    },
    description(state, action) {
      state.description = action.payload;
    },
    tag(state, action) {
      state.tag = action.payload;
    },
  },
});

export const createNFTActions = CreateNFTSlice.actions;

export default CreateNFTSlice.reducer;
