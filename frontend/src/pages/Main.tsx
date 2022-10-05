import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MainLand from '../components/main/MainLand';
import AreaInformation from '../components/main/AreaInformation';
import AreaTutorialInfo from '../components/main/AreaTutorialInfo';
import HangulName from '../commons/HangulName';
import AreaExample from '../components/main/AreaExample';
import { setIsMain } from '../_slice/SaleSlice';

export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsMain());
    return () => {
      dispatch(setIsMain());
    };
  }, []);

  const focus: React.MutableRefObject<HTMLDivElement[]> = React.useRef([]);
  return (
    <Container sx={{ backgroundColor: '#f2e4d8' }}>
      <Grid container alignItems="flex-end">
        <Grid item xs={6} minWidth={570}>
          <AreaInformation focus={focus} />
        </Grid>
        <Grid item xs={6} minWidth={570}>
          <HangulName />
        </Grid>
      </Grid>
      <AreaTutorialInfo focus={focus} />
    </Container>
  );
}
