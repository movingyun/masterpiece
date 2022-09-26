import React from "react";
import { Box, Button, Container } from "@mui/material";
import { UseDispatchHook, UseSelectorHook, firstList, middleList, lastList } from '../../_hook/HangulMakerHook';
import { firstAction, middleAction, lastAction } from '../../_slice/HangulMakerSlice';
import { ConsonantOrder, VowelOrder} from '../../_store/store';

export default function HangulMakerInput(){
  // 자모음 크기단위
  const unit = 10;
  // 초성중성종성 선택 (redux로 구현해야함)
  enum FML{FIRST, MIDDLE, LAST};
  const select = UseSelectorHook(state => state.tab.value);
  // 초성중성종성 리스트
  const letterList:string[][] = [firstList, middleList, lastList,];
  // 초중종성 선택
  const selectLetter = [firstAction, middleAction, lastAction];
  const dispatch = UseDispatchHook();
  const letterChange = (newValue: number) => {
    dispatch(selectLetter[select].change(newValue));
  };

  // 자음, 모음 보유개수
  const consonantCount:number[]=UseSelectorHook(state => state.consonantCount.value);
  const vowelCount:number[]=UseSelectorHook(state => state.vowelCount.value);

  // select 에 따른 자/모음 보유개수
  const count:number[] = [];
  // colorList
  const colorList:string[] = ['#FFD8E3', '#FFEBCD', '#FFFFE0', '#F0FFF0', '#E0FFFF', '#FFD7FF'];

  if(select === FML.FIRST || select === FML.LAST){
    letterList[select].map((letter:string)=>{
      count.push(consonantCount[ConsonantOrder[letter as keyof typeof ConsonantOrder]]);
    });
  }
  else if(select === FML.MIDDLE){
    letterList[select].map((letter:string)=>{
      count.push(vowelCount[VowelOrder[letter as keyof typeof VowelOrder]]);
    });
  }
  return(
    <Container>
      {letterList[select].map((letter:string, index:number)=>{
        // 종성 0번째 빈값
        if(select === FML.LAST && index===0){
          return;
        }
        const color:string = (count[index]>0) ? colorList[index%6] : "#CCCCCC";

        return (
          <Button key={`${letter}middleButton`} 
            onClick={() => {letterChange(index)}}
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
              {count[index].toString()}
            </Box>
            {letter}
          </Button>
        );
      })}
    </Container>
  );
}