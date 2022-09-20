import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { injected } from '../../lib/connectors';
import { isNoEthereumObject } from '../../lib/error';
import { signin } from '../../store/UserSlice';

export default function MetamaskLogin() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  const handdleConnect = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error: any) => {
      if (isNoEthereumObject(error)) {
        window.open('https://metamask.io/download.html');
      }
    });
  };

  useEffect(() => {
    if (account) {
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
        <p>Account: {account}</p>
        <p>ChainId: {chainId}</p>
      </div>
      <hr />
      <div>
        <button type="button" onClick={handdleConnect}>
          {active ? 'disconnect' : 'connect'}
        </button>
      </div>
    </>
  );
}
