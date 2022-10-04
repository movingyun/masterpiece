import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
 
import NFTVideo from '../components/createNFT/NFTVideo';
import NFTInput from '../components/createNFT/NFTInput';
import Mint from '../components/createNFT/Mint';

function CreateNFT() {
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ margin: '10px 0' }}>Create New Item</h1>
      <div>
        <Link to="/">home</Link>
      </div>
      <NFTVideo />
      <NFTInput />
      <Mint />
    </Container>
  );
}

export default CreateNFT;
