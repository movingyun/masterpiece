import React, { useState } from 'react';
import { List, ListItem, ListItemText, Slider } from '@mui/material';
import { CompactPicker, ColorResult } from 'react-color';

import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoShadow() {
  
  const dispatch = useDispatch();
  const style =  UseSelectorHook(state => state.deco.style);
  const strokeWidth = UseSelectorHook(state => state.deco.strokeWidth);
  const strokeColor = UseSelectorHook(state => state.deco.strokeColor);
  const shadowXAxis =  UseSelectorHook(state => state.deco.shadowXAxis);
  const shadowYAxis =  UseSelectorHook(state => state.deco.shadowYAxis);
  const shadowBlur =  UseSelectorHook(state => state.deco.shadowBlur);
  const shadowColor =  UseSelectorHook(state => state.deco.shadowColor);


  const strokeWidthHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.strokeWidth(value));
  };
  const strokeColorHandler = (color: ColorResult) => {
    dispatch(decoActions.strokeColor(color.hex));
  };
  const xAxisHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.shadowXAxis(value));
  };
  const yAxisHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.shadowYAxis(value));
  };
  const shadowBlurHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.shadowBlur(value));
  };
  const shadowColorHandler = (color: ColorResult) => {
    dispatch(decoActions.shadowColor(color.hex));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
        <ListItemText
          primary="Stroke Width"
          secondary={
            <Slider
              aria-label="strokeWidth"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={strokeWidthHandler}
              value={strokeWidth}
              min={0}
              max={30}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Stroke Color"
          secondary={<CompactPicker color={strokeColor} onChange={strokeColorHandler} />}
        />
      </ListItem>
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
          primary="Shadow Bluriness"
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
