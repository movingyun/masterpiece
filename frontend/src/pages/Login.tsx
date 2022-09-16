import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <>
      <div>Login</div>
      <div>
        <Link to="/signup">signup</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
