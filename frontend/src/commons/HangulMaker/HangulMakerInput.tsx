import React from "react";
import { Button, Container } from "@mui/material";
import { useTabSelector } from '../../_hook/HangulMakerHook';

export default function HangulMakerInput(){
  // 자모음 크기단위
  const unit = 10;
  // 초성중성종성 선택 (redux로 구현해야함)
  enum FML{FIRST, MIDDLE, LAST};
  let select:FML = FML.FIRST;
  select = useTabSelector(state => state.select.value);
  // 초성중성종성 리스트(redux로 구현해야함)
  const letterList:string[][] = [
    ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㄲ','ㄸ','ㅃ','ㅆ','ㅉ'],
    ['ㅏ','ㅑ','ㅓ','ㅕ','ㅗ','ㅛ','ㅜ','ㅠ','ㅡ','ㅣ','ㅐ','ㅒ','ㅔ','ㅖ','ㅢ','ㅚ','ㅘ','ㅙ','ㅟ','ㅝ','ㅞ'],
    ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㄲ','ㅆ','ㄳ','ㄵ','ㄶ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅄ']
  ];
  // 초중종성 선택
  return(
    <Container>
      {letterList[select].map((letter:string, index:Number)=>{
        // 현재 letter 보유수
        // const count:Number = letterCountList[index];
        const count:Number=0;
        
        // letter Color (각 자모음 별 보유수, color 필요)
        // const color:string = (count>0) ? "letterColorList[index]" : "#AAAAAA";
        const color:string = (count>0) ? "blue" : "#CCCCCC";
        
        if(index===parseInt((letterList[select].length/2).toString(), 10)){
          return (<><div/>
            <Button sx={{minWidth: unit, minHeight: unit, width: unit*5, height:unit*5}} type="button"
              style={{ margin:"10px", position:"relative",
              fontSize:unit*2.5,
              backgroundColor:color, color:"black",
              borderRadius: "100%",
              border: "2px solid black"
            }}>
              <Button sx={{minWidth: unit, minHeight: unit, width: unit*2, height:unit*2}} type="button"
              style={{ 
                position:"absolute", top:-6, right:-6,
                fontSize:unit,
                backgroundColor:color, color:"black",
                borderRadius: "100%",
                border: "2px solid black"
              }}>
                {count.toString()}
              </Button>
              {letter}
            </Button></>
          );
        }
          return (
            <Button sx={{minWidth: unit, minHeight: unit, width: unit*5, height:unit*5}} type="button"
              style={{ margin:"10px", position:"relative",
              fontSize:unit*2.5,
              backgroundColor:color, color:"black",
              borderRadius: "100%",
              border: "2px solid black"
            }}>
              <Button sx={{minWidth: unit, minHeight: unit, width: unit*2, height:unit*2}} type="button"
              style={{ 
                position:"absolute", top:-6, right:-6,
                fontSize:unit,
                backgroundColor:color, color:"black",
                borderRadius: "100%",
                border: "2px solid black"
              }}>
                {count.toString()}
              </Button>
              {letter}
            </Button>
          );
      })}
    </Container>
  );
}