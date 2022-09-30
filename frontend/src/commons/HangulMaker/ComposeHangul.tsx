import React from "react";
import { firstList, middleList, lastList } from '../../_hook/HangulMakerHook';

// 음절합성 = 문장반환
export function ComposeSyllables(syllables:string[]){
  let result:string = "";
  for(let i=0;i<syllables.length;i++){
    result+=syllables[i];
  }
  return result;
}

// 초성 + 중성 + 종성 = 1음절 반환
export default function ComposeHangul(first:number, middle:number, last:number):string{
  let syllable:string = "";
  if(first>=0 && middle>=0){
    syllable = String.fromCharCode(0xac00 + first * 21 * 28 + middle * 28 + last);
  }
  else if(first>=0){
    syllable = firstList[first];
  }
  else if(middle>=0){
    syllable = middleList[middle];
  }
  else if(last>0){
    syllable = lastList[last];
  }
  return syllable;
}