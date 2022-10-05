import React from "react";
import { Button } from "@mui/material";
import { UseDispatchHook } from "../../_hook/HangulMakerHook";
import { dragValueAction, areaIndexAction, elementIndexAction } from "../../_slice/ComposeHangulSlice";
import { black, white } from "../../_css/ReactCSSProperties";

export default function DragAndDrop({element, value, unit, areaIndex, elementIndex}:any){ // {listIndex}:number
  const dispatch = UseDispatchHook();

  // 드래그 중
  const dragFunction = (e:React.DragEvent, type:string) => {
    e.preventDefault();
    e.stopPropagation();
    const dndObject:HTMLDivElement = (e.target as HTMLDivElement);
  }
  // 드래그 시작
  const dragStartFunction = (e:React.DragEvent, type:string) => {
    // e.preventDefault();
    // e.stopPropagation();
    const dndObject:HTMLDivElement = (e.target as HTMLDivElement);
    dispatch(dragValueAction.setValue(value));
    dispatch(areaIndexAction.setValue(areaIndex));
    dispatch(elementIndexAction.setValue(elementIndex));
  }
  // 드래그 끝
  const dragEndFunction = (e:React.DragEvent, type:string) => {
    // e.preventDefault();
    // e.stopPropagation();
    const dndObject:HTMLDivElement = (e.target as HTMLDivElement);
    dispatch(dragValueAction.setValue(""));
    dispatch(areaIndexAction.setValue(-1));
    dispatch(elementIndexAction.setValue(-1));
  }

  return (
    <Button
      // onClick={() => {}}
      sx={{minWidth: unit*5, minHeight: unit*5, width: unit*5, height:unit*5}} type="button"
      style={{ margin:"10px", position:"relative",
      fontSize:unit*3,
      background:black.toString(), color:white.toString(),
      borderRadius: "100%",
      border: "2px solid black"
    }}
      draggable="true"
      onDrag = {event => dragFunction(event, 'drag')}
      onDragStart = {event => dragStartFunction(event, 'dragStart')}
      onDragEnd = {event => dragEndFunction(event, 'dragEnd')}
      className='dragAndDrop'
      >
      {element}
    </Button>
  );
}