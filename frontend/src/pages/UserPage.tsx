import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserInfo from '../components/userPage/UserInfo';
import UserCardList from '../components/userPage/UserCardList';
import { fetchUser } from '../_slice/UserSlice';

export default function UserPage() {
  const params = useParams();
  const userAddress = params.walletAddress;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userAddress));
  });

  return (
    <>
      {/* <div>UserPage</div> */}
      <UserInfo walletAddress={`${userAddress}`} />
      <UserCardList walletAddress={`${userAddress}`} />
      {/* <div>
        <Link to="/">home</Link>
      </div> */}
    </>
  );
}
