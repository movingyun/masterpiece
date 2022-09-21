import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: gray;
`;

export default function Menu() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const isLogin = useSelector((state: any) => state.user.isLogin);
  const handdleLogout = () => {
    if (active) {
      deactivate();
    }
  };

  return (
    <StyledMenu>
      <div>
        <Link to="/">Logo</Link>
        <Link to="/">Name</Link>
      </div>
      <div>Search</div>
      {isLogin ? (
        <div>
          <Link to="/UserPage">Mypage</Link>
          <Link to="/login" onClick={handdleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
    </StyledMenu>
  );
}
