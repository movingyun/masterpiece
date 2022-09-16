import React from 'react';
import { Link } from 'react-router-dom';

export default function ComposeHangul() {
  return (
    <>
      <div>ComposeHangul</div>

      <div>
        <Link to="/decoratehangul">decorateHangul</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
