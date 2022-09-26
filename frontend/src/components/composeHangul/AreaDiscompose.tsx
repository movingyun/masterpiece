import React from "react";
import { Box } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { useSelectorHook, useDispatchHook } from "../../_hook/HangulMakerHook";
import { areaSentenceAction, areaSyllableAction } from "../../_slice/ComposeHangulSlice";
import { HangulComposeArea } from "../../_store/store";
import discomposeHangul from "../../commons/HangulMaker/DiscomposeHangul";

export default function AreaDiscompose(){
  const dispatch = useDispatchHook();
  const thisArea = HangulComposeArea.SYLLABLES;
  const syllableList:string[]= useSelectorHook(state => state.areaSyllable.value);

  const dragValueState:string = useSelectorHook(state => state.dragValue.value);
  const dragStartArea:HangulComposeArea = useSelectorHook(state => state.areaIndex.value);
  const dragStartElement:number = useSelectorHook(state => state.elementIndex.value);

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
      console.log(discomposeHangul(dragValueState));
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
    // onMouseEnter={event => mouseEnterFunction(event, 'mouseEnter')}
    // onMouseLeave={event => mouseLeaveFunction(event, 'mouseLeave')}
    >
      <RestoreIcon sx={{width:"15%", height:"15%"}}/>
    </Box>
  );
}