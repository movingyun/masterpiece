import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { ChromePicker } from 'react-color';

import { useSelector, useDispatch } from 'react-redux';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoColor() {
  
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.deco.style);
  const backgroundColor = useSelector((state: any) => state.deco.backgroundColor);

  const backgroundColorHandler = (color: any) => {
    dispatch(decoActions.backgroundColor(color.hex));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
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
