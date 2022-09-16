import React from 'react';
import { Link } from 'react-router-dom';

export default function NFTDetail() {
  return (
    <>
      <div>NFTDetail</div>
      <div>
        <Link to="/nftlist">NFTList</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
