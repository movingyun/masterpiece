import React, { useState } from 'react';
import { List, ListItem, ListItemText, Slider } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoAnimation() {
  const dispatch = useDispatch();
  const style = useSelector((state: any) => state.deco.style);
  const animationSpeed = useSelector((state: any) => state.deco.animationLevel);

  const animationSpeedHandler = (event: any, value: any) => {
    dispatch(decoActions.animationSpeed(value));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
        <ListItemText
          primary="Speed"
          secondary={
            <Slider
              aria-label="animationSpeed"
              defaultValue={20}
              valueLabelDisplay="auto"
              onChange={animationSpeedHandler}
              value={animationSpeed}
              min={-50}
              max={50}
            />
          }
        />
      </ListItem>
    </List>
  );
}

export default DecoAnimation;