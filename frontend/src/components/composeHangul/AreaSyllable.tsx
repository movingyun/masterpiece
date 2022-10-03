import React from "react";
import { Container, Box, Button } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';

import { UseSelectorHook, UseDispatchHook } from '../../_hook/HangulMakerHook';
import { areaSentenceAction, areaSyllableAction } from "../../_slice/ComposeHangulSlice";
import DragAndDrop from "./DragAndDrop";
import { HangulComposeArea } from "../../_store/store";
import { GradientBlueToPink } from "../../_css/ReactCSSProperties";

export default function AreaSyllable(){
  const dispatch = UseDispatchHook();
  const thisArea = HangulComposeArea.SYLLABLES;
  const syllableList:string[]= UseSelectorHook(state => state.areaSyllable.value);

  const dragValueState:string = UseSelectorHook(state => state.dragValue.value);
  const dragStartArea:HangulComposeArea = UseSelectorHook(state => state.areaIndex.value);
  const dragStartElement:number = UseSelectorHook(state => state.elementIndex.value);

  // 드래그 후 hover
  const dragOverFunction = (e:React.DragEvent, type:string) => {
    e.preventDefault();
    e.stopPropagation();
    const dropObject:HTMLDivElement = (e.target as HTMLDivElement);
    console.log(type);
  }
  // 드롭
  const dropFunction = (e:React.DragEvent, type:string) => {
    e.preventDefault();
    e.stopPropagation();
    const dropObject:HTMLDivElement = (e.target as HTMLDivElement);
    console.log(type);
    if(dragStartArea===HangulComposeArea.SENTENCE){
      if(dragValueState != " " && dragValueState != "\n"){
        dispatch(areaSyllableAction.push(dragValueState));
      }
      dispatch(areaSentenceAction.delete({index:dragStartElement}));
    }
  }

  // key index 값
  const temp:number[] = [];
  for(let i:number=0;i<syllableList.length;i++){
    temp.push(i);
  }
  
  // 음절 버튼 단위크기
  const unit:number = 10;
  // barckground Color
  const gradientBlueToPink:React.CSSProperties = GradientBlueToPink;
  const thisAreaBackground:React.CSSProperties = {
    border:"2px dashed white",
    marginBottom:10,
    minHeight:500,
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{...gradientBlueToPink, ...thisAreaBackground}}
    className="area"
    onDrop={event => dropFunction(event, 'drop')}
    onDragOver={event => dragOverFunction(event, 'dragOver')}
    >
      <Container>
        {syllableList.map((syllable:string, index:number)=>(
          (syllable===" ") ? (<DragAndDrop key={`$AreaSyllable${syllableList[index]}${temp[index]}`} element={<SpaceBarIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>)
          : (
            (syllable==="\n") ? (<DragAndDrop key={`$AreaSyllable${syllableList[index]}${temp[index]}`} element={<KeyboardReturnIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>)
            : (
            <DragAndDrop key={`$AreaSyllable${syllableList[index]}${temp[index]}`} element={syllable} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
          ))
        ))}
      </Container>
    </Box>
  );
}