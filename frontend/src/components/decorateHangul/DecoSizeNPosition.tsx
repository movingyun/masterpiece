import React from 'react'
import { List, ListItem, ListItemText, Slider } from '@mui/material';
import { ChromePicker, CompactPicker } from 'react-color';

import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoText() {
  
  const dispatch = useDispatch();
  const style =  UseSelectorHook(state => state.deco.style);
  const textSize =  UseSelectorHook(state => state.deco.textSize);
  const textXAxis =  UseSelectorHook(state => state.deco.textXAxis);
  const textYAxis =  UseSelectorHook(state => state.deco.textYAxis);
  const textWidthSpacing =  UseSelectorHook(state => state.deco.textWidthSpacing);
  const textLineSpacing =  UseSelectorHook(state => state.deco.textLineSpacing);


  const textSizeHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.textSize(value));
  };
  const textXAxisHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.textXAxis(value));
  };
  const textYAxisHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.textYAxis(value));
  };
  const textWidthSpacingHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.textWidthSpacing(value));
  };
  const textLineSpacingHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.textLineSpacing(value));
  };


  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
        <ListItemText
          primary="Text Size"
          secondary={
            <Slider
              aria-label="size"
              defaultValue={50}
              valueLabelDisplay="auto"
              onChange={textSizeHandler}
              value={textSize}
              min={5}
              max={150}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text X Axis"
          secondary={
            <Slider
              aria-label="textXAxis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textXAxisHandler}
              value={textXAxis}
              min={-256}
              max={256}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text Y Axis"
          secondary={
            <Slider
              aria-label="textYAxis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textYAxisHandler}
              value={textYAxis}
              min={-256}
              max={256}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text Width Spacing"
          secondary={
            <Slider
              aria-label="textWidthSpacing"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textWidthSpacingHandler}
              value={textWidthSpacing}
              min={-100}
              max={100}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text Line Spacing"
          secondary={
            <Slider
              aria-label="textLineSpacing"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textLineSpacingHandler}
              value={textLineSpacing}
              min={-100}
              max={100}
            />
          }
        />
      </ListItem>
    </List>
  );
}

export default DecoText