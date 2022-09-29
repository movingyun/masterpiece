import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { UseDispatchHook, UseSelectorHook } from '../_hook/HangulMakerHook';
import { getFisrt, getMiddle, getLast, getConsonant, consonantCountAction, vowelCountAction } from '../_slice/ComposeHangulSlice';

import HangulMaker from '../commons/HangulMaker/HangulMaker';
import AreaTranslate from '../components/composeHangul/AreaTranslate';
import AreaDiscompose from '../components/composeHangul/AreaDiscompose';
import AreaSyllable from '../components/composeHangul/AreaSyllable';
import AreaSentence from '../components/composeHangul/AreaSentence';

export default function ComposeHangul() {
  const walletAddress = UseSelectorHook(state => state.user.currentUser.wallet_address);
  const dispatch = UseDispatchHook();
  React.useEffect(()=>{
    if(walletAddress.charAt(0)==='0'){
      dispatch(getConsonant(walletAddress));
      dispatch(getMiddle(walletAddress));
    }
  }, [walletAddress]);
  
  return (
    <Container>
      <div style={{margin:10, fontSize:50}}>Make Your Own Word/Sentence</div>
      <Grid container>
        <Grid container item xs={6} style={{padding:10}}>
          <Grid item xs={12}><AreaTranslate/></Grid>
          <Grid item xs={12}><HangulMaker test={false}/></Grid>
        </Grid>
        <Grid container item xs={6} style={{padding:10}}>
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