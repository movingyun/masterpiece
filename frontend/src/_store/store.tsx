import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import HangulReducer from '../_slice/HangulSlice';
import UserReducer from '../_slice/UserSlice';
import NFTReducer from '../_slice/NFTSlice';
import SaleReducer from '../_slice/SaleSlice';
import GameReducer from '../_slice/GameSlice';
import { selectTab, selectFirst, selectMiddle, selectLast } from '../_slice/HangulMakerSlice';
import {
  dragValue,
  areaIndex,
  elementIndex,
  areaSyllable,
  areaSentence,
  consonantCount,
  vowelCount,
} from '../_slice/ComposeHangulSlice';
import DecoReducer from '../_slice/DecorateHangulSlice';
import CreateNFTReducer from '../_slice/CreateNFTSlice';

// 초성중성종성 리스트
export const hangulFirst: string[] = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
export const hangulMiddle: string[] = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];
export const hangulLast: string[] = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

// 자음, 모음 순서
export enum ConsonantOrder {
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
  'ㄸ',
  'ㅃ',
  'ㅉ',
}
export enum ConsonantOrder2 {
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
}
export enum VowelOrder {
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
}
export enum FtoL {
  '_0',
  '_1',
  '_3',
  '_6',
  '_27',
  '_7',
  '_15',
  '_16',
  '_28',
  '_18',
  '"19',
  '"20',
  '_21',
  '_29',
  '_22',
  '_23',
  '_24',
  '_25',
  '_26',
}

// 한글합성 area 번호
export enum HangulComposeArea {
  DISCOMPOSE,
  SYLLABLES,
  SENTENCE,
}

const store = configureStore({
  reducer: {
    user: UserReducer,
    deco: DecoReducer,
    createNFT: CreateNFTReducer,
    hangul: HangulReducer,
    nft: NFTReducer,
    sale: SaleReducer,
    game: GameReducer,

    tab: selectTab.reducer, // 한글제작 초/중/종성 선택
    first: selectFirst.reducer, // 한글제작 초성
    middle: selectMiddle.reducer, // 한글제작 중성
    last: selectLast.reducer, // 한글제작 종성

    dragValue: dragValue.reducer, // 드래그중인 값
    areaIndex: areaIndex.reducer, // 드래그중인 값
    elementIndex: elementIndex.reducer, // 드래그중인 값
    areaSyllable: areaSyllable.reducer, // 한글합성 음절목록
    areaSentence: areaSentence.reducer, // 한글합성 문장목록

    consonantCount: consonantCount.reducer, // 자음보유개수
    vowelCount: vowelCount.reducer, // 모음보유개수
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
