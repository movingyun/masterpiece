import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameData } from '../../_slice/GameSlice';

export default function GameMain() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);

  const handler = () => {
    const payload = { walletAddress };
    dispatch(fetchGameData(payload));
  };
  return (
    <>
      <div>sound btn</div>
      <div>options</div>
      <Button onClick={handler}>test</Button>
    </>
  );
}
