import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/connectors';
import { isNoEthereumObject } from '../../lib/error';
import { checkLogin, logout, signin } from '../../_slice/UserSlice';

export default function MetamaskLogin() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  const isLogin = useSelector((state: any) => state.user.isLogin);
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

  return (
    <>
      <hr />
      <div>
        <p>Account: {currentUser.wallet_address}</p>
        <p>ChainId: {chainId}</p>
      </div>
      <hr />
      <div>
        <button type="button" onClick={handdleConnect}>
          {isLogin ? 'disconnect' : 'connect'}
        </button>
      </div>
    </>
  );
}
