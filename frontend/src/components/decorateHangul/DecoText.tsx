import React from 'react'
import { List, ListItem, ListItemText, Slider } from '@mui/material';
import { ChromePicker, CompactPicker } from 'react-color';

import { useSelector, useDispatch } from 'react-redux';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoText() {
  
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.deco.style);
  const textSize = useSelector((state: any) => state.deco.textSize);
  const textColor = useSelector((state: any) => state.deco.textColor);
  const textXAxis = useSelector((state: any) => state.deco.textXAxis);
  const textYAxis = useSelector((state: any) => state.deco.textYAxis);
  const textLineSpacing = useSelector((state: any) => state.deco.textLineSpacing);
  const strokeWidth = useSelector((state: any) => state.deco.borderRadius);
  // const strokeOpacity = useSelector((state: any) => state.deco.borderOpacity);
  const strokeColor = useSelector((state: any) => state.deco.borderColor);

  const textSizeHandler = (event: any, value: any) => {
    dispatch(decoActions.textSize(value));
  };
  const textColorHandler = (color: any) => {
    dispatch(decoActions.textColor(color.hex));
  };
  const textXAxisHandler = (event: any, value: any) => {
    dispatch(decoActions.textXAxis(value));
  };
  const textYAxisHandler = (event: any, value: any) => {
    dispatch(decoActions.textYAxis(value));
  };
  const textLineSpacingHandler = (event: any, value: any) => {
    dispatch(decoActions.textLineSpacing(value));
  };
  const strokeWidthHandler = (event: any, value: any) => {
    dispatch(decoActions.strokeWidth(value));
  };
  // const strokeOpacityHandler = (event: any, value: any) => {
  //   dispatch(decoActions.strokeOpacity(value));
  // };
  const strokeColorHandler = (color: any) => {
    dispatch(decoActions.strokeColor(color.hex));
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
          primary="Text Color"
          secondary={<ChromePicker disableAlpha color={textColor} onChange={textColorHandler} />}
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text x-axis"
          secondary={
            <Slider
              aria-label="textXAxis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textXAxisHandler}
              value={textXAxis}
              min={0}
              max={512}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text y-axis"
          secondary={
            <Slider
              aria-label="textYAxis"
              defaultValue={0}
              valueLabelDisplay="auto"
              onChange={textYAxisHandler}
              value={textYAxis}
              min={0}
              max={512}
            />
          }
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Text line-spacing"
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
    </List>
  );
}

export default DecoText