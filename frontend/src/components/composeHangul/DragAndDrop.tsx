import React from "react";
import { Grid } from "@mui/material";

export default function DragAndDrop({element}:any){
  // 영역에 들어갈 HTML element
  const [object, setObject] = React.useState<any>(element);
  // React.useEffect(()=>{
  //   setObject(element);
  // },[]);

  const dragFunction = (e:React.DragEvent, type:string) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(type);
  }

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      style={{width:100, height:100, border:"2px solid black", borderRadius:"100%"}}
      draggable="true"
      onDrop={event => dragFunction(event, 'drop')}
      onDragEnter={event => dragFunction(event, 'enter')}
      onDragLeave={event => dragFunction(event, 'leave')}
      className='dragAndDrop'
    > {element}
    </Grid>
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