import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGameData } from '../../_slice/GameSlice';
import StartedGame from './StartedGame';

export default function GameMain() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const gameId = useSelector((state: any) => state.game.gameId);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [showGame, setshowGame] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      const payload = { userWalletAddress: walletAddress };
      // dispatch(fetchGameData(payload));
    }
  }, [walletAddress]);

  useEffect(() => {
    if (start) {
      const countdown = setInterval(() => {
        if (seconds >= 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === -1) {
          clearInterval(countdown);
          setshowGame(true);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [seconds, start]);

  const startHandler = () => {
    if (gameId) {
      const payload = { userWalletAddress: walletAddress };
      // dispatch(fetchGameData(payload));
    }
    setStart(true);
  };

  return (
    <div>
      {start ? (
        seconds <= 0 ? (
          showGame ? (
            <StartedGame />
          ) : (
            'Game Start!'
          )
        ) : (
          seconds
        )
      ) : (
        <Button onClick={startHandler}>Game Start</Button>
      )}
    </div>
  );
}
