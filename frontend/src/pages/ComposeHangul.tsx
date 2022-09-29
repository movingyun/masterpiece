import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseDispatchHook, UseSelectorHook } from '../_hook/HangulMakerHook';
import { getFisrt, getMiddle, getLast, getConsonant, consonantCountAction, vowelCountAction } from '../_slice/ComposeHangulSlice';

import HangulMaker from '../commons/HangulMaker/HangulMaker';
import AreaDiscompose from '../components/composeHangul/AreaDiscompose';
import AreaSyllable from '../components/composeHangul/AreaSyllable';
import AreaSentence from '../components/composeHangul/AreaSentence';

export default function ComposeHangul() {
  const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
  const dispatch = UseDispatchHook();
  const payload = {
    walletAddress,
  }
  dispatch(getConsonant(walletAddress));
  dispatch(getMiddle(walletAddress));
  return (
    <Container>
      <div style={{margin:10, fontSize:50}}>Make Your Own Word</div>
      <Grid container>
        <Grid item xs={6}>
          <HangulMaker/>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}><AreaDiscompose/></Grid>
          <Grid item xs={12}><AreaSyllable/></Grid>
        </Grid>
        <Grid item xs={12}>
          <AreaSentence/>
        </Grid>
        <div>
          <Link to="/decoratehangul">decorateHangul</Link>
        </div>
        <div>
          <Link to="/">home</Link>
        </div>
      </Grid>
    </Container>
  );
}