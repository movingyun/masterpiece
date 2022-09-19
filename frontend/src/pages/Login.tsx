import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../lib/connectors';
import { isNoEthereumObject } from '../lib/error';

export default function Login() {
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
      <div>Login</div>
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

      <div>
        <Link to="/signup">signup</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
