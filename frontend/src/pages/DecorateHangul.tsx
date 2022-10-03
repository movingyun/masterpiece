import React from 'react';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import Canvas from '../components/decorateHangul/Canvas';
import Deco from '../components/decorateHangul/Deco';

export default function DecorateHangul() {
  

  return (
    <Container sx={{ marginTop: 5 }}>
      {/* <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/createnft">createNFT</Link>
      </div> */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7.5} justifyContent="center">
          <Canvas />
        </Grid>
        <Grid item xs={4.5}>
          <Deco />
        </Grid>
      </Grid>
    </Container>
  );
}
