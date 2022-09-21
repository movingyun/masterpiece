import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: gray;
`;

export default function Navigation() {
  return (
    <StyledNav>
      <Link to="/">Home</Link>
      <Link to="/nftlist">NFT List</Link>
      <Link to="/learnsyllables">Learn Syllables</Link>
      <Link to="/composehangul">Compose Hangul</Link>
      <Link to="/bylot">By Lot</Link>
      <Link to="/hangulgame">Game</Link>
    </StyledNav>
  );
}
