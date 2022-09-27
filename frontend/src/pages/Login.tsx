import React from 'react';
import { Link } from 'react-router-dom';
import MetamaskLogin from '../components/login/MetamaskLogin';

export default function Login() {
  return (
    <>
      <div>Login</div>
      <MetamaskLogin />
      <div>
        <Link to="/signup">signup</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
