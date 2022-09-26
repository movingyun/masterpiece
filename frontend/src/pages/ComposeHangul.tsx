import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import HangulMaker from '../commons/HangulMaker/HangulMaker';
import DragAndDrop from '../components/composeHangul/DragAndDrop';
import AreaDiscompose from '../components/composeHangul/AreaDiscompose';
import AreaSyllable from '../components/composeHangul/AreaSyllable';
import AreaSentence from '../components/composeHangul/AreaSentence';

export default function ComposeHangul() {
  return (
    <Container>
      <div style={{margin:10, fontSize:50}}>Make Your Own Word</div>
      <Grid container>
        <Grid item xs={6}>
          <HangulMaker/>
        </Grid>
        <Grid container direction="column" item xs={6}>
          <Grid item xs={6}><AreaDiscompose/></Grid>
          <Grid item xs={6}><AreaSyllable/></Grid>
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
