import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import HangulMaker from '../commons/HangulMaker/HangulMaker';

export default function LearnSyllables() {
  return (
    <Container>
      <div style={{margin:10, fontSize:50}}>Try to make a syllable</div>
      <HangulMaker test/>
      <div>
        <Link to="/">home</Link>
      </div>
    </Container>
  );
}
