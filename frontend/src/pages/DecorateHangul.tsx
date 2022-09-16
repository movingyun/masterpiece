import React from 'react';
import { Link } from 'react-router-dom';

export default function DecorateHangul() {
  return (
    <>
      <div>DecorateHangul</div>
      <div>
        <Link to="/createNFT">createNFT</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
