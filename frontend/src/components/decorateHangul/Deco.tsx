import React from 'react'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FontDownload, BlurOnSharp, Radar, ColorLens, Animation } from '@mui/icons-material';

import DecoSizeNPosition from './DecoSizeNPosition';
import DecoEffect from './DecoEffect';
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
            <Tab icon={<Radar />} label="size & Position" value="2" />
            <Tab icon={<BlurOnSharp />} label="Effect" value="3" />
            <Tab icon={<ColorLens />} label="Colors" value="4" />
            <Tab icon={<Animation />} label="Animation" value="5" />
          </TabList>
        </Box>
        <TabPanel sx={{ height: '70vh'}} value="1"><DecoFontPicker /></TabPanel>
        <TabPanel value="2"><DecoSizeNPosition /></TabPanel>
        <TabPanel value="3"><DecoEffect /></TabPanel>
        <TabPanel value="4"><DecoColor /></TabPanel>
        <TabPanel value="5"><DecoAnimation /></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Deco