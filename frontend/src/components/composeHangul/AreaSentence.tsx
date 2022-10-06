import React from "react";
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import { UseSelectorHook, UseDispatchHook } from "../../_hook/HangulMakerHook";
import { areaSentenceAction, areaSyllableAction } from "../../_slice/ComposeHangulSlice";
import { HangulComposeArea } from "../../_store/store";
import DragAndDrop from "./DragAndDrop";
import { ComposeSyllables } from "../../commons/HangulMaker/ComposeHangul";
import { black, white, yellow } from "../../_css/ReactCSSProperties";

export default function AreaSentence({ gridxs }: any) {
  const thisArea = HangulComposeArea.SENTENCE;
  const sentenceList:string[]= UseSelectorHook(state => state.areaSentence.value);
  const [sentenceStringList, setSentenceStringList] = React.useState(['']);
  const [indexArray, setIndexArray] = React.useState<number[]>([]);
  React.useEffect(()=>{
    const sentenceString = ComposeSyllables(sentenceList);
    setSentenceStringList(sentenceString.split('\n'));

    if(sentenceList.length>indexArray.length){
      // key index 값
      const temp:number[] = [];
      for(let i:number=0;i<sentenceList.length;i++){
        temp.push(i);
      }
      setIndexArray(temp);
    }
  }, [sentenceList]);
  

  const dragValueState:string = UseSelectorHook(state => state.dragValue.value);
  const dragStartArea:HangulComposeArea = UseSelectorHook(state => state.areaIndex.value);
  const dragStartElement:number = UseSelectorHook(state => state.elementIndex.value);
  const dispatch = UseDispatchHook();

  // 드래그 후 hover
  const dragOverFunction = (e:React.DragEvent, type:string) => {
    e.preventDefault();
    e.stopPropagation();
    const dropObject:HTMLDivElement = (e.target as HTMLDivElement);
    console.log(type);
  }
  // 드롭
  const dropFunction = (e:React.DragEvent, index:number) => {
    e.preventDefault();
    e.stopPropagation();
    const dropObject:HTMLDivElement = (e.target as HTMLDivElement);
    if(dragStartArea===HangulComposeArea.SENTENCE){
      const startIndex = dragStartElement;
      const finishIndex = index;
      const payload = {startIndex, finishIndex, dragValueState};
      dispatch(areaSentenceAction.move(payload));
    }
    else if(dragStartArea===HangulComposeArea.SYLLABLES){
      const payload = {index, dragValueState};
      dispatch(areaSentenceAction.add(payload));
      if(dragStartElement>1){
        dispatch(areaSyllableAction.delete({index:dragStartElement}));
      }
    }
  }

  // go to Decorate
  const saveSentence = () => {
    let sentence: string = ''
    for (let i = 0; i < sentenceList.length;i++){
      sentence += sentenceList[i];
    }
    console.log(sentence);
  }

  const dropAreaBox:any = (index:number):JSX.Element => 
  (
    <Box display="flex" justifyContent="center" alignItems="center"
      style={{width:unit*3, height:unit*5, backgroundColor:"#FFFFFF", border:"1px dashed black"}}
      className="area"
      onDrop={event => dropFunction(event, index)}
      onDragOver={event => dragOverFunction(event, 'dragOver')}
    />
  );
  

  // 음절 버튼 단위크기
  const unit:number = 10;
  return (
    <Container style={{position:"relative", padding:0}}>
      <Grid container>
        <Grid item xs={gridxs} style={{padding:10, paddingRight:20}}>
          <Box display="flex" justifyContent="center" alignItems="center"
          style={{width:"100%", minHeight:200, paddingLeft:10, background:white.toString(), border:"1px solid black", borderRadius:10}}
          >
            <Grid container direction="row">
              <Box display="flex" justifyContent="center" alignItems="center">
                {dropAreaBox(0)}
              </Box>
              {sentenceList.map((syllable:string, index:number)=>(
                (index===0) ? (<div key={`$AreaSentence${sentenceList[index]}${indexArray[index]}`}/>)
                : ((syllable===" ") ? (
                  <Box key={`$AreaSentence${sentenceList[index]}${indexArray[index]}`} display="flex" justifyContent="center" alignItems="center">
                    <DragAndDrop element={<SpaceBarIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                    {dropAreaBox(index)}
                  </Box>
                  )
                  : (
                    (syllable==="\n") ? (
                    <>
                      <DragAndDrop element={<KeyboardReturnIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                      <Grid item xs={12}><div /></Grid>
                      <Box display="flex" justifyContent="center" alignItems="center">
                        {dropAreaBox(index)}
                      </Box>
                    </>)
                    : (
                    <Box key={`$AreaSentence${sentenceList[index]}${indexArray[index]}`} display="flex" justifyContent="center" alignItems="center">
                      <DragAndDrop element={syllable} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                      {dropAreaBox(index)}
                    </Box>
                    )
                  )
                )
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={gridxs} style={{padding:10}}>
          <Box display="flex" justifyContent="center" alignItems="center"
          style={{width:"100%", minHeight:200, background:black.toString(), border:"1px solid black", borderRadius:10}}
          >
            <div style={{fontSize:50}}>
              {sentenceStringList.map((syllable:string, index:number)=>(
                <Container key={`$AreaSentenceString${sentenceStringList[index]}${indexArray[index]}`} style={{ color:white.toString() }}>{syllable}<br/></Container>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>
      <Box mt={1} display="flex" justifyContent="flex-end" alignItems="center">
        <Button onClick={ saveSentence } style={{ background: black.toString(), color: white.toString() }}>
          <Link to="/decoratehangul" style={{color:"#FFFFFF", textDecoration: 'none'}}>Go To Decorate</Link>
        </Button>
      </Box>
    </Container>
  );
}