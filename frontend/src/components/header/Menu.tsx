import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { checkLogin, logout, getCurrentUser, signin } from '../../_slice/UserSlice';
import { injected } from '../../lib/connectors';
import { isNoEthereumObject } from '../../lib/error';

import logo from '../../img/logo.png';

const Header = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  z-index: 2;
`;

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  background: transparent;
  height: 70px;
  line-height: 70px;
  margin: 0 30px;
  color: #fff;
  font-family: Poppins, sans-serif;
`;
const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  `;
  const Logo = styled.div`
  `
  const Navigation = styled.div`
    float: left;
    height: 70px;
    margin-left: 30px;
    > a {
      display: inline-block;
      height: 65px;
      margin-right: 25px;
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      color: black;
    }
    > button {
      height: 60px;
      border: none;
      background-color: transparent;
      font-weight: 700;
      font-size: 18px;
    }
    > button:hover,
    a:hover {
      border-bottom: 5px solid;
      transition-property: border-bottom;
      transition-duration: 0.2s;
      cursor: pointer; 
    }
    > a:visited {
      color: black;
      text-decoration: none;
    }
  `;



export default function Menu() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state: any) => state.user.isLogin);
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const currentUser = useSelector((state: any) => state.user.currentUser);

  const handdleConnect = () => {
    if (active || isLogin) {
      deactivate();
      dispatch(logout());
      return;
    }

    activate(injected, (error: any) => {
      if (isNoEthereumObject(error)) {
        window.open('https://metamask.io/download.html');
      }
    });
  };

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (!isLogin && account) {
      const payload = {
        wallet_address: account,
      };
      // axios 요청
      dispatch(signin(payload));
    }
  }, [account]);


  const handdleLogout = () => {
    if (isLogin) {
      deactivate();
      dispatch(logout());
      navigate('/')
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
    <Header>
      <StyledMenu>
        <StyledNav>
          <Logo>
            <Link to="/"><img src={logo} alt="logo" height='70px'/></Link>
          </Logo>
          <Navigation>
            <Link to="/">Home</Link>
            <Link to="/nftlist">NFT List</Link>
            <Link to="/learnsyllables">Learn Syllables</Link>
            <Link to="/composehangul">Compose Hangul</Link>
            <Link to="/bylot">Random Draw</Link>
            <Link to="/hangulgame">Game</Link>
          </Navigation>
        </StyledNav>
        {isLogin ? (
          <Navigation>
            <Link to={`/userpage/${walletAddress}`}>Mypage</Link>
            <button type="button" onClick={handdleLogout}>
              Logout
            </button>
          </Navigation>
        ) : (
          <Navigation>
            <button type="button" onClick={handdleConnect}>
              {isLogin ? 'disconnect' : 'Login'}
            </button>
            {/* <Link to="/login">Login</Link> */}
          </Navigation>
        )}
      </StyledMenu>
    </Header>
  );
}
