import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../_slice/UserSlice';

interface UserInfoType {
  walletAddress: String;
}
export default function UserInfo({ walletAddress }: UserInfoType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(walletAddress));
  }, []);

  const searchedUser = useSelector((state: any) => state.user.searchedUser);

  return (
    <>
      <h1>{searchedUser.nickname}</h1>
      <div>{searchedUser.wallet_address}</div>
      <div>Joined {searchedUser.joinDate}</div>
      <div>{searchedUser.message}</div>
    </>
  );
}
