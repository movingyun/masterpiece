import React from 'react';
import { Link } from 'react-router-dom';
import HangulMaker from '../commons/HangulMaker/HangulMaker';

export default function ComposeHangul() {
  console.log("abcd");
  return (
    <>
      <div>
        <HangulMaker/>
      </div>

      <div>
        <Link to="/decoratehangul">decorateHangul</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
