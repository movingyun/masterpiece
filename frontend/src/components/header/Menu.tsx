import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { checkLogin, logout, getCurrentUser } from '../../_slice/UserSlice';

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: gray;
`;

export default function Menu() {
  const { deactivate } = useWeb3React();

  const dispatch = useDispatch();

  const isLogin = useSelector((state: any) => state.user.isLogin);
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);

  const handdleLogout = () => {
    if (isLogin) {
      deactivate();
      dispatch(logout());
    }
  };

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(getCurrentUser());
    }
  }, [isLogin]);

  return (
    <StyledMenu>
      <div>
        <Link to="/">Logo</Link>
        <Link to="/">Name</Link>
      </div>
      {isLogin ? (
        <div>
          <Link to={`/userpage/${walletAddress}`}>Mypage</Link>
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
