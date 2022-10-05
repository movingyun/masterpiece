import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import HangulMaker from '../commons/HangulMaker/HangulMaker';
import { black, white } from '../_css/ReactCSSProperties';

export default function LearnSyllables() {
  return (
    <Container>
      <div style={{marginTop:50, marginBottom:50, marginLeft:20, fontSize:50}}>Practice to make a syllable</div>
      <HangulMaker test/>
      <div style={{textAlign:"right"}}>
        <Button style={{ marginTop:20, background: black.toString(), color: white.toString() }}>
        <Link to="/composehangul" style={{background: black.toString(), color:white.toString(), textDecoration: 'none'}}>Get Start</Link>
        </Button>
      </div>
    </Container>
  );
}
