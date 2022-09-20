import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: gray;
`;

export default function Menu() {
  return (
    <StyledMenu>
      <div>
        <Link to="/">Logo</Link>
        <Link to="/">Name</Link>
      </div>
      <div>Search</div>
      <div>
        <Link to="/UserPage">Mypage</Link>
      </div>
    </StyledMenu>
  );
}
