import React from "react";
import { Button } from "@mui/material";
import { useDispatchHook } from "../../_hook/HangulMakerHook";
import { dragValueAction, areaIndexAction, elementIndexAction } from "../../_slice/ComposeHangulSlice";

export default function DragAndDrop({element, value, unit, areaIndex, elementIndex}:any){ // {listIndex}:number
  // 영역에 들어갈 HTML element
  // const [object, setObject] = React.useState<any>(element);
  // React.useEffect(()=>{
  //   setObject(element);
  // },[]);
  const dispatch = useDispatchHook();

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
      backgroundColor:"#CCCCCC", color:"black",
      borderRadius: "100%",
      border: "2px solid black"
    }}
      draggable="true"
      // onDragEnter={event => dragFunction(event, 'enter')}
      // onDragLeave={event => dragFunction(event, 'leave')}
      onDrag = {event => dragFunction(event, 'drag')}
      onDragStart = {event => dragStartFunction(event, 'dragStart')}
      onDragEnd = {event => dragEndFunction(event, 'dragEnd')}
      className='dragAndDrop'
      >
      {element}
    </Button>
  );
}

// export default function DragAndDrop(props:any){
//   // 영역에 들어갈 HTML element
//   const [element, setElement] = React.useState(props.element);

//   const dragStartHandler = (e:Event) => {
//     const img = new Image();
//     e.dataTransfer.setDragImage(img, 0, 0);
//     posX = e.clientX;
//     posY = e.clientY;
//     originalX = e.target.offsetLeft;
//     originalY = e.target.offsetTop;
//   };
//   const onDrop = (result: DropResult) =>{

//   }
//   return(
//     <Container>

//     </Container>
//   );
// }