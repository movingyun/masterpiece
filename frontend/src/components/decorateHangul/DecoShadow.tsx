import React, { useState } from 'react';
import { List, ListItem, ListItemText, Slider } from '@mui/material';
import { CompactPicker } from 'react-color';

import { useSelector, useDispatch } from 'react-redux';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoShadow() {
  
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.deco.style);
  const shadowXAxis = useSelector((state: any) => state.deco.shadowXAxis);
  const shadowYAxis = useSelector((state: any) => state.deco.shadowYAxis);
  const shadowBlur = useSelector((state: any) => state.deco.shadowBlur);
  const shadowColor = useSelector((state: any) => state.deco.shadowColor);

  const xAxisHandler = (event: any, value: any) => {
    dispatch(decoActions.shadowXAxis(value));
  };
  const yAxisHandler = (event: any, value: any) => {
    dispatch(decoActions.shadowYAxis(value));
  };
  const shadowBlurHandler = (event: any, value: any) => {
    dispatch(decoActions.shadowBlur(value));
  };
  const shadowColorHandler = (color: any) => {
    dispatch(decoActions.shadowColor(color.hex));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
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
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Shadow Color"
          secondary={<CompactPicker color={shadowColor} onChange={shadowColorHandler} />}
        />
      </ListItem>
    </List>
  );
}

export default DecoShadow;
