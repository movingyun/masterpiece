import React from 'react';
import { Link, useParams } from 'react-router-dom';
import UserInfo from '../components/userPage/UserInfo';
import UserCardList from '../components/userPage/UserCardList';

export default function UserPage() {
  const params = useParams();
  const userAddress = params.walletAddress;

  return (
    <>
      <div>UserPage</div>
      <UserInfo walletAddress={`${userAddress}`} />
      <UserCardList walletAddress={`${userAddress}`} />
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
