import React from "react";
import { Grid, Tab, Tabs, Typography, Box, Button, Container } from "@mui/material";
import { useTabDispatch } from '../../_hook/HangulMakerHook';
import { change } from '../../_slice/HangulMakerSlice';
import HangulMakerInput from "./HangulMakerInput";

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
  const unit = 40;
  // 초중종 버튼 가로
  const width = unit*3;
  // 초중종 버튼 세로
  const height = unit*4;

  // tab Value
  const [value, setValue] = React.useState(0);

  // tab 누를때 select 값 변경
  const dispatch = useTabDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(change(newValue));
    setValue(newValue);
  };

  return (
    <Container>
        <Box sx={{ width: '100%' }}>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<Button sx={{width: {width}, height:{height}}} style={{position:"relative", margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(0).id} aria-controls={a11yProps(0)["aria-controls"]} />
            <Tab label={<Button sx={{width: {width}, height:{height}}} style={{position:"relative", margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(1).id} aria-controls={a11yProps(1)["aria-controls"]} />
            <Tab label={<Button sx={{width: {width}, height:{height}}} style={{position:"relative", margin:unit/2, backgroundColor:"#DDDDDD"}}/>} id={a11yProps(2).id} aria-controls={a11yProps(2)["aria-controls"]} />
          </Tabs>
          <Button sx={{width: {width}, height:{height}}} style={{position:"relative", margin:unit/2, backgroundColor:"#DDDDDD"}}/>
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
      </Box>
    </Container>
  );
}