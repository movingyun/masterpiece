import React from "react";
import { Box, Button, Container } from "@mui/material";
import { useTabSelector, firstList, middleList, lastList } from '../../_hook/HangulMakerHook';

export default function HangulMakerInput(){
  // 자모음 크기단위
  const unit = 10;
  // 초성중성종성 선택 (redux로 구현해야함)
  enum FML{FIRST, MIDDLE, LAST};
  const select = useTabSelector(state => state.tab.value);
  // 초성중성종성 리스트
  const letterList:string[][] = [firstList, middleList, lastList,];
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

        return (
          <Button key={`${letter}middleButton`} 
            sx={{minWidth: unit, minHeight: unit, width: unit*5, height:unit*5}} type="button"
            style={{ margin:"10px", position:"relative",
            fontSize:unit*2.5,
            backgroundColor:color, color:"black",
            borderRadius: "100%",
            border: "2px solid black"
          }}>
            <Box key={`${letter}countButton`}
            sx={{minWidth: unit, minHeight: unit, width: unit*2, height:unit*2,}}
            style={{
              position:"absolute", top:-6, right:-6,
              fontSize:unit,
              backgroundColor:color, color:"black",
              borderRadius: "100%",
              border: "2px solid black"
            }}>
              {count.toString()}
            </Box>
            {letter}
          </Button>
        );
      })}
    </Container>
  );
}