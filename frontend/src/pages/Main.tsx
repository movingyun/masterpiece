import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import MainLand from '../components/main/MainLand';
import AreaTutorialInfo from '../components/main/AreaTutorialInfo';

export default function Main() {
  return (
    <div>
      <Grid container style={{width:window.innerHeight}}>
        <Grid item xs={6}><MainLand /></Grid>
        <Grid item xs={6}><MainLand /></Grid>
      </Grid>
      <AreaTutorialInfo />
      <div>
        <Link to="/composehangul">create</Link>
      </div>
      <div>
        <Link to="/nftlist">explore</Link>
      </div>
    </div>
  );
}
