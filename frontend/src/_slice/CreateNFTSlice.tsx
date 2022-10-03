import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  NFTBlob: new Blob(),
  NFTBlobURL: '',
  title: '',
  description: '',
  tag: [],
  checkLetterAPI: {},
  mintingCompleted: false,
};

const CreateNFTSlice = createSlice({
  name: 'createNFT',
  initialState,
  reducers: {
    NFTBlob(state, action) {
      state.NFTBlob = action.payload;
    },
    NFTBlobURL(state, action) {
      state.NFTBlobURL = action.payload;
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
    checkLetterAPI(state, action) {
      state.checkLetterAPI = action.payload;
    },
    mintingCompleted(state, action) {
      state.mintingCompleted = action.payload;
    },
  },
});

export const createNFTActions = CreateNFTSlice.actions;

export default CreateNFTSlice.reducer;
