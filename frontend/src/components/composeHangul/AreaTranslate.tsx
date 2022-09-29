import React from "react";
import { Box, Grid, TextField, Button } from '@mui/material';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import axios, { AxiosRequestConfig } from "axios";
import api from "../../api/api";

export default function AreaTranslate(){
  let inputText:string = "apple I like banana";
  let translateText:string = "이거 읽어봐라 멍청한 컴퓨터야 뷁";

  const changeInputText = (event:any) => {
    inputText = event.target.value;
  }
  const changeTranslateText = (event:any) => {
    translateText = event.target.value;
  }
  
  const tts = (lang:string, text:string)=>{
    const msg = new SpeechSynthesisUtterance();
    msg.lang = lang;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }


  const translate = async (source:string, target:string) =>{
    const requestBody:any = {
      source, target, inputText,
    }
    const data = await axios.get(api.translate(), requestBody);
    console.log(data);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{marginBottom:20, width:"100%", minHeight:160, backgroundColor:"#FFFFFF"}}
    className="area"
    >
      <Grid container>
        <Grid item xs={1}/>
        <Grid container item xs={4}>
          <Grid item xs={12} style={{margin:0}}>
            <TextField required multiline rows={3} fullWidth label="input text" defaultValue={inputText}
            onChange={changeInputText}/>
          </Grid>
          <Grid container item xs={12} style={{margin:0}}>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, border:"1px solid #00AA00"}}>
                <Button onClick={()=>tts('en', inputText)} style={{color:"#00AA00"}}><VolumeDownRoundedIcon/></Button>
              </Box>
            </Grid>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, backgroundColor:"#00AA00", border:"1px solid #00AA00"}}>
                <Button onClick={()=>translate('en', 'ko')} style={{color:"#FFFFFF"}}>Translate</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">{'->'}</Grid>
        <Grid container item xs={4}>
          <Grid item xs={12} style={{margin:0}}>
            <TextField multiline rows={3} fullWidth label="translate" defaultValue={translateText}
              InputProps={{
                readOnly: true,
              }}
              onChange={changeTranslateText}/>
          </Grid>
          <Grid container item xs={12} style={{margin:0}}>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, border:"1px solid #00AA00"}}>
                <Button onClick={()=>tts('ko', translateText)} style={{color:"#00AA00"}}><VolumeDownRoundedIcon/></Button>
              </Box>
            </Grid>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, backgroundColor:"#00AA00", border:"1px solid #00AA00"}}>
                <Button style={{color:"#FFFFFF"}}>Translate</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    </Box>
  );
}