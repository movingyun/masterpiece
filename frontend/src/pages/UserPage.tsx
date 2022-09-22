import React from 'react';
import { Link, useParams } from 'react-router-dom';
import UserInfo from '../components/userPage/UserInfo';

export default function UserPage() {
  const params = useParams();
  const userAddress = params.walletAddress;

  return (
    <>
      <div>UserPage</div>
      <UserInfo walletAddress={`${userAddress}`} />
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
