import React from 'react';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import Svg from '../components/decorateHangul/Svg';
import Deco from '../components/decorateHangul/Deco';

export default function DecorateHangul() {
  

  return (
    <Container>
      <div>DecorateHangul</div>
      <div>
        <Link to="/createNFT">createNFT</Link>
        <Link to="/">home</Link>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={7.5}>
          <Svg />
        </Grid>
        <Grid item xs={4.5}>
          <Deco />
        </Grid>
      </Grid>
    </Container>
  );
}
