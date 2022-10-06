import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchGameData } from '../../_slice/GameSlice';
import StartedGame from './StartedGame';
import beepWav from '../../audio/beep.wav';
import startMp3 from '../../audio/start.mp3';
import { selectTabButtonStyle } from '../../_css/ReactCSSProperties';

export default function GameMain() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const gameId = useSelector((state: any) => state.game.gameId);
  const questionOption = useSelector((state: any) => state.game.questionOption);
  const questionAnswer = useSelector((state: any) => state.game.questionAnswer);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(3);
  const [showGame, setshowGame] = useState(false);

  const beepAudio = new Audio(beepWav);
  const startAudio = new Audio(startMp3);

  const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > * {
      margin: 70px;
    }
  `;
  const StyledTitle = styled.div`
    font-size: 70px;
  `;

  useEffect(() => {
    if (start) {
      const countdown = setInterval(() => {
        if (seconds > 1) {
          beepAudio.play();
        }
        if (seconds === 1) {
          startAudio.play();
        }
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
    beepAudio.play();
    const payload = { userWalletAddress: walletAddress };
    dispatch(fetchGameData(payload));
    setStart(true);
  };

  const reset = () => {
    setStart(false);
    setSeconds(3);
    setshowGame(false);
  };

  return (
    <StyledMenu>
      {start ? (
        seconds <= 0 ? (
          showGame ? (
            <StartedGame reset={reset} />
          ) : (
            <StyledTitle>Game Start!</StyledTitle>
          )
        ) : (
          <StyledTitle>{seconds}</StyledTitle>
        )
      ) : (
        <>
          <StyledTitle>Hangul Game</StyledTitle>
          <Button
            onClick={startHandler}
            variant="contained"
            sx={{ width: 200, height: 50, fontSize: 20 }}
            style={{ ...selectTabButtonStyle }}>
            Game Start
          </Button>
        </>
      )}
    </StyledMenu>
  );
}
