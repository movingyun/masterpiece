import React, { useState } from 'react';
import { List, ListItem, ListItemText, Slider } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoAnimation() {
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.deco.style);
  

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      {/* <ListItem divider>
        <ListItemText
          primary="Shadow x-axis"
          secondary={
            <Slider
              aria-label="axis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={xAxisHandler}
              value={shadowXAxis}
              min={-50}
              max={50}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Shadow y-axis"
          secondary={
            <Slider
              aria-label="axis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={yAxisHandler}
              value={shadowYAxis}
              min={-50}
              max={50}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Blur"
          secondary={
            <Slider
              aria-label="blur"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={shadowBlurHandler}
              value={shadowBlur}
              min={0}
              max={30}
            />
          }
        />
      </ListItem> */}
    </List>
  );
}

export default DecoAnimation;