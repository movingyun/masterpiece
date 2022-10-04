import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { ChromePicker, Color, ColorResult } from 'react-color';

import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoColor() {
  
  const dispatch = useDispatch();
  const style =  UseSelectorHook(state => state.deco.style);
  const textColor =  UseSelectorHook(state => state.deco.textColor);
  const backgroundColor =  UseSelectorHook(state => state.deco.backgroundColor);
  
  const textColorHandler = (color: ColorResult) => {
    dispatch(decoActions.textColor(color.hex));
  };
  const backgroundColorHandler = (color: ColorResult) => {
    dispatch(decoActions.backgroundColor(color.hex));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
        <ListItemText
          primary="Text Color"
          secondary={<ChromePicker disableAlpha color={textColor} onChange={textColorHandler} />}
        />
      </ListItem>
      <ListItem divider>
        <ListItemText
          primary="Background Color"
          secondary={<ChromePicker disableAlpha color={backgroundColor} onChange={backgroundColorHandler} />}
        />
      </ListItem>
    </List>
  );
}

export default DecoColor;
