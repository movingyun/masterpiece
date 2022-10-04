import React from "react";
import { Box, Grid, TextField, Button, Select, MenuItem } from '@mui/material';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import axios from "axios";
import api from "../../api/api";
import { GradientBlueToPink } from "../../_css/ReactCSSProperties";

export default function AreaTranslate(){

  const [sourceLanguage, setSourceLanguage] = React.useState("en");
  const [targetLanguage, setTargetLanguage] = React.useState("ko");
  const [inputText, setInputText] = React.useState("apple I like banana");
  const [translateText, setTranslateText] = React.useState("이거 읽어봐라 멍청한 컴퓨터야 뷁");

  const changeInputText = (event:any) => {
    setInputText(event.target.value);
  }
  const changeTranslateText = (event:any) => {
    setTranslateText(event.target.value);
  }
  const changeSourceLanguage = (event:any) =>{
    setSourceLanguage(event.target.value);
  }
  
  const tts = (lang:string, text:string)=>{
    const msg = new SpeechSynthesisUtterance();
    msg.lang = lang;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  const translate = async () =>{
    const requestBody:any = {
      source:sourceLanguage, target:targetLanguage, text:inputText,
    }
    const data = await axios.post(api.translate(), requestBody);
    setTranslateText(data.data);
  }
  const gradientBlueToPink:React.CSSProperties = GradientBlueToPink;
  const thisAreaBackground:React.CSSProperties = {
    marginBottom:20,
    minHeight:300,
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{...gradientBlueToPink, ...thisAreaBackground}}
    className="area"
    >
      <Grid container>
        <Grid item xs={1}/>
        <Grid item xs={11} style={{paddingBottom:20}}>
          <Select
            value={sourceLanguage}
            onChange={changeSourceLanguage}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            style={{minWidth:180}}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='ja'>日本語</MenuItem>
            <MenuItem value='zh-CN'>简体中文</MenuItem>
            <MenuItem value='zh-TW'>繁体中文</MenuItem>
            <MenuItem value='es'>español</MenuItem>
            <MenuItem value='fr'>Français</MenuItem>
            <MenuItem value='de'>Deutsch</MenuItem>
            <MenuItem value='ru'>Русский</MenuItem>
            <MenuItem value='pt'>Português</MenuItem>
            <MenuItem value='it'>Italiano</MenuItem>
            <MenuItem value='vi'>Tiếng Việt</MenuItem>
            <MenuItem value='th'>ไทย</MenuItem>
            <MenuItem value='id'>bahasa Indonesia</MenuItem>
            <MenuItem value='hi'>हिन्दी</MenuItem>
            <MenuItem value='fa'>فارسی</MenuItem>
            <MenuItem value='ar'>عربي</MenuItem>
          </Select>
        </Grid>
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
                <Button onClick={()=>tts(sourceLanguage, inputText)} style={{color:"#00AA00"}}><VolumeDownRoundedIcon/></Button>
              </Box>
            </Grid>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, backgroundColor:"#00AA00", border:"1px solid #00AA00"}}>
                <Button onClick={()=>translate()} style={{color:"#FFFFFF"}}>Translate</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">{'->'}</Grid>
        <Grid container item xs={4}>
          <Grid item xs={12} style={{margin:0}}>
            <TextField multiline rows={3} fullWidth label="translate" value={translateText}
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