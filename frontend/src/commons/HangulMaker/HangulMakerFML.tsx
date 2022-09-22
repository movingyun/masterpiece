import React from "react";
import { Grid, Tab, Tabs, Typography, Box, Button, } from "@mui/material";
import { useTabDispatch, useTabSelector } from '../../_hook/HangulMakerHook';
import { tabAction, firstAction, middleAction, lastAction } from '../../_slice/HangulMakerSlice';
import HangulMakerInput from "./HangulMakerInput";
import composeHangul from "./ComposeHangul";

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function HangulMakerFML(){
  // 초중종 버튼 단위길이
  const unit = 20;
  // 초중종 버튼 가로
  const width = unit*3;
  // 초중종 버튼 세로
  const height = unit*4;

  const dispatch = useTabDispatch();

  // 초기화
  const[setting, setSetting] = React.useState(false);
  React.useEffect(()=>{
    if(setting){
      return;
    }
    dispatch(firstAction.change(-1));
    dispatch(middleAction.change(-1));
    dispatch(lastAction.change(0));
    setSetting(true);
  }, []);

  // 초성 중성 종성
  const first:number = useTabSelector(state => state.first.value);
  const middle:number = useTabSelector(state => state.middle.value);
  const last:number = useTabSelector(state => state.last.value);

  // 음절 미리보기
  const[syllable, setSyllable] = React.useState("");
  React.useEffect(()=>{
    setSyllable(composeHangul(first, middle, last));
    console.log(composeHangul(0, 0, 10));
  }, [first, middle, last]);

  // tab Value
  const [value, setValue] = React.useState(0);

  // tab 누를때 select 값 변경
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(tabAction.change(newValue));
    setValue(newValue);
  };

  return (
    <Grid container item xs={12}>
      <Grid item xs={9} justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab style={{maxWidth: width}} label={<Box sx={{width: {width}, height:{height}}} style={{margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(0).id} aria-controls={a11yProps(0)["aria-controls"]} />
            <Tab style={{maxWidth: width}} label={<Box sx={{width: {width}, height:{height}}} style={{margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(1).id} aria-controls={a11yProps(1)["aria-controls"]} />
            <Tab style={{maxWidth: width}} label={<Box sx={{width: {width}, height:{height}}} style={{margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(2).id} aria-controls={a11yProps(2)["aria-controls"]} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={3} justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button sx={{width: {width}, height:{height}}} style={{margin:unit/2, marginTop:unit, backgroundColor:"#DDDDDD"}}/>
        </Box>
      </Grid>
      <TabPanel value={value} index={0}>
        <HangulMakerInput/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HangulMakerInput/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HangulMakerInput/>
      </TabPanel>
    </Grid>
  );
}