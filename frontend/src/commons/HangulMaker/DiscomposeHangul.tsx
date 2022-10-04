import React from "react";
import { EnumConsonantOrder, EnumVowelOrder, EnumFtoL } from '../../_hook/HangulMakerHook';

// 문장 분리 후 자모음 반환
export function DiscomposeSentence(sentence:string):string[] {
  // console.log(sentence);
  const list: string[] = [];
  for (let i = 0; i < sentence.length;i++){
    const fml: number[] = DiscomposeHangul(sentence.charAt(i));
    if (fml[0]>=0) {
      list.push(EnumConsonantOrder[fml[0]]);
    }
    if (fml[1]>=0) {
      list.push(EnumVowelOrder[fml[1]]);
    }
    if (fml[2]>0) {
      list.push(EnumConsonantOrder[fml[2]-1]);
    }
  }
  return list;
}
// 1개음절의 unicode 반환
export default function DiscomposeHangul(syllable:string):number[]{

  const syllableUnicode:number = syllable.charCodeAt(0);
  let payload = {
    index: syllableUnicode-'ㅏ'.charCodeAt(0),
  };
  
  if(syllableUnicode<0xAC00){
    if('ㅏ'.charCodeAt(0)<=syllableUnicode && 'ㅣ'.charCodeAt(0)>=syllableUnicode){
      payload = {
        index: EnumVowelOrder[syllable as keyof typeof EnumVowelOrder],
      };
      return [-1, EnumVowelOrder[syllable as keyof typeof EnumVowelOrder], -1];  // 모음
    }
    payload = {
      index: EnumConsonantOrder[syllable as keyof typeof EnumConsonantOrder],
    };
    return [EnumConsonantOrder[syllable as keyof typeof EnumConsonantOrder], -1, -1];  // 자음
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