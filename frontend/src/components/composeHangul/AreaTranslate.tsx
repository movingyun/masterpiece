import React from "react";
import { Box, Grid, TextField, Button, Select, MenuItem } from '@mui/material';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import axios from "axios";
import api from "../../api/api";
import { black, BlackWhite, GradientBlueToPink, white, yellow } from "../../_css/ReactCSSProperties";

export default function AreaTranslate(){

  const [sourceLanguage, setSourceLanguage] = React.useState("en");
  const [targetLanguage, setTargetLanguage] = React.useState("ko");
  const [inputText, setInputText] = React.useState("");
  const [translateText, setTranslateText] = React.useState("");

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

  const translate = async () => {
    if (inputText.trim().length==0) {
      return;
    }
    const requestBody:any = {
      source:sourceLanguage, target:targetLanguage, text:inputText,
    }
    const data = await axios.post(api.translate(), requestBody);
    setTranslateText(data.data);
  }
  // barckground Color
  const currentBlackWhite:React.CSSProperties = BlackWhite;
  const thisAreaBackground:React.CSSProperties = {
    marginBottom:20,
    minHeight:300,
  }

  // backgroundColor
  const backgroundColor: string = white.toString();
  // textColor
  const textColor: string = black.toString();
  
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{...currentBlackWhite, ...thisAreaBackground, borderRadius:10, marginTop:-10}}
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
            style={{ minWidth: 180, background: backgroundColor, color: textColor }}
            sx={{ '.MuiSvgIcon-root': {fill: `${textColor} !important`} }}
          >
            <MenuItem value='en' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>English</MenuItem>
            <MenuItem value='ja' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>日本語</MenuItem>
            <MenuItem value='zh-CN' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>简体中文</MenuItem>
            <MenuItem value='zh-TW' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>繁体中文</MenuItem>
            <MenuItem value='es' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>español</MenuItem>
            <MenuItem value='fr' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Français</MenuItem>
            <MenuItem value='de' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Deutsch</MenuItem>
            <MenuItem value='ru' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Русский</MenuItem>
            <MenuItem value='pt' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Português</MenuItem>
            <MenuItem value='it' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Italiano</MenuItem>
            <MenuItem value='vi' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>Tiếng Việt</MenuItem>
            <MenuItem value='th' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>ไทย</MenuItem>
            <MenuItem value='id' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>bahasa Indonesia</MenuItem>
            <MenuItem value='hi' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>हिन्दी</MenuItem>
            <MenuItem value='fa' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>فارسی</MenuItem>
            <MenuItem value='ar' style={{ minWidth: 180, background: backgroundColor, color: textColor }}>عربي</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={1}/>
        <Grid container item xs={4}>
          <Grid item xs={12} style={{margin:0}}>
            <TextField required multiline rows={3} fullWidth label="input text" defaultValue={inputText}
              onChange={changeInputText}
              style={{ background: backgroundColor, border:`1px solid ${backgroundColor}` }}
              inputProps={{ style: { color: textColor } }}
              sx={{ '.MuiInputLabel-root': { background:backgroundColor , color:textColor } }} />
          </Grid>
          <Grid container item xs={12} style={{margin:0}}>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, background:textColor, border:`1px solid ${textColor}`}}>
                <Button onClick={()=>tts(sourceLanguage, inputText)} style={{color:backgroundColor}}><VolumeDownRoundedIcon/></Button>
              </Box>
            </Grid>
            <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, background:yellow.toString(), border:`1px solid ${black.toString()}`}}>
                <Button onClick={()=>translate()} style={{color:black.toString()}}>Translate</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center"><DoubleArrowIcon/></Grid>
        <Grid container item xs={4}>
          <Grid item xs={12} style={{margin:0}}>
            <TextField multiline rows={3} fullWidth label="translate" value={translateText}
              InputProps={{
                readOnly: true,
              }}
              onChange={changeTranslateText}
              style={{ background: backgroundColor, border:`1px solid ${backgroundColor}` }}
              inputProps={{ style: { color: textColor } }}
              sx={{ '.MuiInputLabel-root': { background:backgroundColor , color:textColor } }} />
          </Grid>
          <Grid container item xs={12} style={{margin:0}}>
            <Grid item xs={12} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, background:textColor, border:`1px solid ${textColor}`}}>
                <Button onClick={()=>tts('ko', translateText)} style={{color:backgroundColor}}><VolumeDownRoundedIcon/></Button>
              </Box>
            </Grid>
            {/* <Grid item xs={6} style={{margin:0}}>
              <Box display="flex" justifyContent="center" alignItems="center"
              style={{margin:0, padding:0, width:"100%", minHeight:50, backgroundColor:"#00AA00", border:"1px solid #00AA00"}}>
                <Button style={{color:"#FFFFFF"}}>Translate</Button>
              </Box>
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    </Box>
  );
}