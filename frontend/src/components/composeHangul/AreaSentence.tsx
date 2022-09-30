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

export default function AreaSentence(){
  const thisArea = HangulComposeArea.SENTENCE;
  const sentenceList:string[]= UseSelectorHook(state => state.areaSentence.value);
  const [sentenceStringList, setSentenceStringList] = React.useState(['']);
  React.useEffect(()=>{
    const sentenceString = ComposeSyllables(sentenceList);
    setSentenceStringList(sentenceString.split('\n'));
  }, [sentenceList])

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

  // 음절 버튼 단위크기
  const unit:number = 10;
  return (
    <Container style={{position:"relative", padding:0}}>
      <Grid container>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center"
          style={{width:"100%", minHeight:200, backgroundColor:"#F8CECE", border:"1px solid black"}}
          >
            <Grid container direction="row">
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{marginLeft:unit, width:unit*2, minHeight:unit*5, backgroundColor:"#FFFFFF", border:"1px dashed black"}}
              className="area"
              onDrop={event => dropFunction(event, 0)}
              onDragOver={event => dragOverFunction(event, 'dragOver')}
              />
              {sentenceList.map((syllable:string, index:number)=>(
                (index===0) ? (<div key={`$AreaSentence${sentenceList[index]}`}/>)
                : ((syllable===" ") ? (
                  <>                
                    <DragAndDrop key={`$AreaSentence${sentenceList[index]}`} element={<SpaceBarIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                    <Box key={`$AreaSentenceSpace${sentenceList[index]}`} display="flex" justifyContent="center" alignItems="center"
                    style={{width:unit*2, minHeight:unit*5, backgroundColor:"#FFFFFF", border:"1px dashed black"}}
                    className="area"
                    onDrop={event => dropFunction(event, index)}
                    onDragOver={event => dragOverFunction(event, 'dragOver')}
                    />
                  </>
                  )
                  : (
                    (syllable==="\n") ? (<><DragAndDrop key={`$AreaSentence${sentenceList[index]}`} element={<KeyboardReturnIcon/>} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                    <Grid key={`$AreaSentenceDiv${sentenceList[index]}`} item xs={12}><div/></Grid>
                    <Box key={`$AreaSentenceSpace${sentenceList[index]}`} display="flex" justifyContent="center" alignItems="center"
                    style={{marginLeft:unit, width:unit*2, minHeight:unit*5, backgroundColor:"#FFFFFF", border:"1px dashed black"}}
                    className="area"
                    onDrop={event => dropFunction(event, index)}
                    onDragOver={event => dragOverFunction(event, 'dragOver')}
                    />
                    </>)
                    : (
                    <>                
                      <DragAndDrop key={`$AreaSentence${sentenceList[index]}`} element={syllable} value={syllable} unit={unit} areaIndex={thisArea} elementIndex={index}/>
                      <Box key={`$AreaSentenceSpace${sentenceList[index]}`} display="flex" justifyContent="center" alignItems="center"
                      style={{width:unit*2, minHeight:unit*5, backgroundColor:"#FFFFFF", border:"1px dashed black"}}
                      className="area"
                      onDrop={event => dropFunction(event, index)}
                      onDragOver={event => dragOverFunction(event, 'dragOver')}
                      />
                    </>
                    )
                  )
                )
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center" alignItems="center"
          style={{width:"100%", minHeight:200, backgroundColor:"#F8CECE", border:"1px solid black"}}
          >
            <div style={{fontSize:50}}>
              {sentenceStringList.map((syllable:string)=>(
                  <>{syllable}<br/></>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>
      <Box mt={1} display="flex" justifyContent="flex-end" alignItems="center">
        <Button onClick={ saveSentence } style={{ backgroundColor: "green", color: "white" }}>
          <Link to="/decoratehangul" style={{color:"#FFFFFF", textDecoration: 'none'}}>Go To Decorate</Link>
        </Button>
      </Box>
    </Container>
  );
}