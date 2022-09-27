import React from "react";
import { Box } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { UseSelectorHook, UseDispatchHook } from "../../_hook/HangulMakerHook";
import { areaSentenceAction, areaSyllableAction, consonantCountAction, vowelCountAction } from "../../_slice/ComposeHangulSlice";
import { HangulComposeArea } from "../../_store/store";
import DiscomposeHangul from "../../commons/HangulMaker/DiscomposeHangul";

export default function AreaDiscompose(){
  const dispatch = UseDispatchHook();
  const thisArea = HangulComposeArea.DISCOMPOSE;
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
    // 분해
    if(dragValueState!="space" && dragValueState!="enter"){
      const letterList = DiscomposeHangul(dragValueState);
      let payload = {};
      if(letterList[0]>=0){
        payload = {
          index: letterList[0],
        };
        dispatch(consonantCountAction.discompose(payload));
      }
      if(letterList[1]>=0){
        payload = {
          index: letterList[1],
        };
        dispatch(vowelCountAction.discompose(payload));
      }
      if(letterList[2]>=0){
        payload = {
          index: letterList[2],
        };
        dispatch(consonantCountAction.discompose(payload));
      }
    }
    if(dragStartArea===HangulComposeArea.SYLLABLES){
      if(dragValueState!="space" && dragValueState!="enter"){
        dispatch(areaSyllableAction.delete({index:dragStartElement}));
      }
    }
    else if(dragStartArea===HangulComposeArea.SENTENCE){
      dispatch(areaSentenceAction.delete({index:dragStartElement}));
    }
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{width:"100%", minHeight:100, backgroundColor:"#F8CECE", border:"1px dashed black"}}
    className="area"
    onDrop={event => dropFunction(event, 'drop')}
    onDragOver={event => dragOverFunction(event, 'dragOver')}
    >
      <RestoreIcon sx={{width:"15%", height:"15%"}}/>
    </Box>
  );
}