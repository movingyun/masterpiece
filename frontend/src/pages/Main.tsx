import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import MainLand from '../components/main/MainLand';
import AreaInformation from '../components/main/AreaInformation';
import AreaTutorialInfo from '../components/main/AreaTutorialInfo';
import AreaExample from '../components/main/AreaExample';

export default function Main() {
  const focus:React.MutableRefObject<HTMLDivElement[]> = React.useRef([]);
  return (
    <Container>
      <Grid container alignItems="flex-end">
        <Grid item xs={6}><AreaInformation focus={focus}/></Grid>
        <Grid item xs={6}><AreaExample/></Grid>
      </Grid>
      <Container><AreaTutorialInfo focus={focus} /></Container>
      <div>
        <Link to="/composehangul">create</Link>
      </div>
      <div>
        <Link to="/nftlist">explore</Link>
      </div>
    </Container>
  );
}
