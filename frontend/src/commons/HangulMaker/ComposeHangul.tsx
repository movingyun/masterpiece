import React from "react";
import { firstList, middleList, lastList } from '../../_hook/HangulMakerHook';

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