import React from 'react';
import { Link } from 'react-router-dom';

export default function NFTList() {
  return (
    <>
      <div>NFTList</div>
      <div>
        <Link to="/userpage">userPage</Link>
      </div>
      <div>
        <Link to="/nftdetail">NFTDetail</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
