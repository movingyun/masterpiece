import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../lib/connectors';
import { isNoEthereumObject } from '../../lib/error';

export default function MetamaskLogin() {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

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
