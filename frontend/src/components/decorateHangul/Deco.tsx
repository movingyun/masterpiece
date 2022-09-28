import React from 'react'
import { Container, Grid, Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FontDownload, TextFields, Title, ColorLens, Animation } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// import DecorateHangul from '../components/decorateHangul/DecorateHangul';
import DecoText from './DecoText';
import DecoShadow from './DecoShadow';
import DecoColor from './DecoColor'
import DecoFontPicker from './DecoFontPicker';
import DecoAnimation from './DecoAnimation';



function Deco() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable icon lab API tabs example">
            <Tab icon={<FontDownload />} label="Fonts" value="1" />
            <Tab icon={<Title />} label="Text" value="2" />
            <Tab icon={<TextFields />} label="Shadow" value="3" />
            <Tab icon={<ColorLens />} label="Color" value="4" />
            <Tab icon={<Animation />} label="Animation" value="5" />
          </TabList>
        </Box>
        <TabPanel sx={{ height: '70vh'}} value="1"><DecoFontPicker /></TabPanel>
        <TabPanel value="2"><DecoText /></TabPanel>
        <TabPanel value="3"><DecoShadow /></TabPanel>
        <TabPanel value="4"><DecoColor /></TabPanel>
        <TabPanel value="5"><DecoAnimation /></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Deco