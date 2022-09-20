import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { injected } from '../../lib/connectors';
import { isNoEthereumObject } from '../../lib/error';
import { signin } from '../../store/UserSlice';

export default function MetamaskLogin() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) dispatch(signin(account));
  }, [account]);

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
