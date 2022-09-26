import React from "react";
import { useDispatchHook, EnumConsonantOrder, EnumVowelOrder, EnumFtoL } from '../../_hook/HangulMakerHook';
import { consonantCountAction, vowelCountAction } from '../../_slice/ComposeHangulSlice';

export default function discomposeHangul(syllable:string):number[]{
  // enum ConsonantOrder{'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄸ', 'ㅃ', 'ㅉ'};
  // enum VowelOrder {'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'};
  
  const dispatch = useDispatchHook();
  const syllableUnicode:number = syllable.charCodeAt(0);
  let payload = {
    index: syllableUnicode-'ㅏ'.charCodeAt(0),
  };
  if(syllableUnicode<0xAC00){
    if('ㅏ'.charCodeAt(0)<=syllableUnicode && 'ㅣ'.charCodeAt(0)>=syllableUnicode){
      payload = {
        index: EnumVowelOrder[syllable as keyof typeof EnumVowelOrder],
      };
      dispatch(vowelCountAction.discompose(payload));
      return [EnumVowelOrder[syllable as keyof typeof EnumVowelOrder]];  // 모음
    }
    payload = {
      index: EnumConsonantOrder[syllable as keyof typeof EnumConsonantOrder],
    };
    dispatch(consonantCountAction.discompose(payload));
    return [EnumConsonantOrder[syllable as keyof typeof EnumConsonantOrder]];  // 자음
  }
  // console.log('ㅏ'.charCodeAt(0), 'ㅐ'.charCodeAt(0), 'ㅑ'.charCodeAt(0), 'ㅒ'.charCodeAt(0),
  // 'ㅓ'.charCodeAt(0), 'ㅔ'.charCodeAt(0), 'ㅕ'.charCodeAt(0), 'ㅖ'.charCodeAt(0), 'ㅗ'.charCodeAt(0),
  // 'ㅘ'.charCodeAt(0), 'ㅙ'.charCodeAt(0), 'ㅚ'.charCodeAt(0), 'ㅛ'.charCodeAt(0), 'ㅜ'.charCodeAt(0),
  // 'ㅝ'.charCodeAt(0), 'ㅞ'.charCodeAt(0), 'ㅟ'.charCodeAt(0), 'ㅠ'.charCodeAt(0), 'ㅡ'.charCodeAt(0),
  // 'ㅢ'.charCodeAt(0), 'ㅣ'.charCodeAt(0));
  console.log(syllableUnicode, (
    syllableUnicode-0xAC00)/28/21,
    ((syllableUnicode-0xAC00)/28)%21, (syllableUnicode-0xAC00)%28);
  const list:number[] = [];
  const first:number = Math.floor(Math.floor((syllableUnicode-0xAC00)/28)/21);
  list[0] = parseInt(EnumFtoL[first].toString().substring(1),10);
  list[1] = Math.floor((syllableUnicode-0xAC00)/28)%21;
  list[2] = (syllableUnicode-0xAC00)%28 - 1;
  return list;
}