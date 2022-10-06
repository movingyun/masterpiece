import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import MainLand from '../components/main/MainLand';
import AreaExplain from '../components/main/AreaExplain';
import AreaInformation from '../components/main/AreaInformation';
import HangulName from '../commons/HangulName';
import AreaExample from '../components/main/AreaExample';
import { setIsMain } from '../_slice/SaleSlice';
import { defaultBackground } from '../_css/ReactCSSProperties';

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
    <Container sx={{backgroundColor: defaultBackground.toString()}} style={{padding:0}}>
      <Grid container alignItems="flex-end">
        <Grid item xs={7} minWidth={570}><AreaExplain focus={focus}/></Grid>
        <Grid item xs={5} minWidth={450}><HangulName/></Grid>
      </Grid>
      <AreaInformation focus={focus} />
    </Container>
  );
}
