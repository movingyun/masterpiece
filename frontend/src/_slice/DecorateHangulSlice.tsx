import { createSlice } from '@reduxjs/toolkit';

interface InterState {
  textSize: number,
  textColor: string,
  textXAxis: number,
  textYAxis: number,
  textWidthSpacing: number,
  textLineSpacing: number,
  strokeWidth: number,
  strokeColor: string,
  shadowXAxis: number,
  shadowYAxis: number,
  shadowBlur: number,
  shadowColor: string,
  backgroundColor: string,
  fontName: string,
  animationSpeed: number,
  style: {},
}

const initialState: InterState = {
  textSize: 50,
  textColor: '#000000',
  textXAxis: 0,
  textYAxis: 0,
  textWidthSpacing: 0,
  textLineSpacing: 0,
  strokeWidth: 0,
  strokeColor: '#ffffff',
  shadowXAxis: 0,
  shadowYAxis: 0,
  shadowBlur: 0,
  shadowColor: '#000000',
  backgroundColor: '#ededed',
  fontName: 'BlackHanSans',
  animationSpeed: 20,
  style: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
};

const DecorateHangulSlice = createSlice({
  name: 'deco',
  initialState,
  reducers: {
    textSize(state, action) {
      state.textSize = action.payload;
    },
    textColor(state, action) {
      state.textColor = action.payload;
    },
    textXAxis(state, action) {
      state.textXAxis = action.payload;
    },
    textYAxis(state, action) {
      state.textYAxis = action.payload;
    },
    textWidthSpacing(state, action) {
      state.textWidthSpacing = action.payload;
    },
    textLineSpacing(state, action) {
      state.textLineSpacing = action.payload;
    },
    strokeWidth(state, action) {
      state.strokeWidth = action.payload;
    },
    strokeColor(state, action) {
      state.strokeColor = action.payload;
    },
    shadowXAxis(state, action) {
      state.shadowXAxis = action.payload;
    },
    shadowYAxis(state, action) {
      state.shadowYAxis = action.payload;
    },
    shadowBlur(state, action) {
      state.shadowBlur = action.payload;
    },
    shadowColor(state, action) {
      state.shadowColor = action.payload;
    },
    backgroundColor(state, action) {
      state.backgroundColor = action.payload;
    },
    fontName(state, action) {
      state.fontName = action.payload;
    },
    animationSpeed(state, action) {
      state.animationSpeed = action.payload;
    },
  },
});

export const decoActions = DecorateHangulSlice.actions;

export default DecorateHangulSlice.reducer;
