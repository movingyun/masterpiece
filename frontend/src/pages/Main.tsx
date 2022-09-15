import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <div>
      <div>Main</div>
      <div>
        <Link to="/composehangul">create</Link>
      </div>
      <div>
        <Link to="/nftlist">explore</Link>
      </div>
    </div>
  );
}
