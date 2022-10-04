import React from 'react';
import { List, ListItem, ListItemText, Slider } from '@mui/material';

import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';

import { decoActions } from '../../_slice/DecorateHangulSlice';

function DecoAnimation() {
  const dispatch = useDispatch();
  const style =  UseSelectorHook(state => state.deco.style);
  const animationSpeed = UseSelectorHook(state => state.deco.animationSpeed);

  const animationSpeedHandler = (_: Event, value: number | number[]) => {
    dispatch(decoActions.animationSpeed(value));
  };

  return (
    <List sx={style} component="nav" aria-label="fontsize">
      <ListItem divider>
        <ListItemText
          primary="Dependency"
          secondary={
            <Slider
              aria-label="animationSpeed"
              defaultValue={20}
              valueLabelDisplay="auto"
              onChange={animationSpeedHandler}
              value={animationSpeed}
              marks={[
                {
                  value: 0,
                  label: '0',
                },
              ]}
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