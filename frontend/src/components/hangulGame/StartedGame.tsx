import { Button, Box } from '@mui/material';
import React, { MouseEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { putGameLog } from '../../_slice/GameSlice';
import correctMp3 from '../../audio/correct.mp3';
import oopsMp3 from '../../audio/oops.mp3';
import endMp3 from '../../audio/end.mp3';
import sadendMp3 from '../../audio/sadend.mp3';
import oneTicket from '../../img/ticket/one.png';
import twoTicket from '../../img/ticket/two.png';
import threeTicket from '../../img/ticket/three.png';
import fourTicket from '../../img/ticket/four.png';
import fiveTicket from '../../img/ticket/five.png';
import volume from '../../img/volume.png';
import { black, yellow, white, selectTabButtonStyle } from '../../_css/ReactCSSProperties';

export default function StartedGame({ reset }: any) {
  const dispatch = useDispatch();
  const gameId = useSelector((state: any) => state.game.gameId);
  const questionOption = useSelector((state: any) => state.game.questionOption);
  const questionAnswer = useSelector((state: any) => state.game.questionAnswer);
  const [qNum, setQNum] = useState(0);
  const [answer, setAnswer] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [showAns, setShowAns] = useState(false);
  const [correct, setCorrect] = useState(false);
  const ticket = [oneTicket, twoTicket, threeTicket, fourTicket, fiveTicket];

  const correctAudio = new Audio(correctMp3);
  const oopsAudio = new Audio(oopsMp3);
  const endAudio = new Audio(endMp3);
  const sadendAudio = new Audio(sadendMp3);

  const btnStyle = { width: 200, m: 2, p: 2, typography: 'h5' };

  const StyledBtnWrap = styled.div`
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;

  const StyledInterfaceWrap = styled.div`
    display: flex;
    justify-content: space-between;
  `;

  const StyledWordWrap = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const StyledInterface = styled.div`
    font-size: 20px;
    font-weight: 600;
  `;

  const StyledWord = styled.div`
    font-size: 50px;
    font-weight: 600;
  `;

  const StyledCorrect = styled.div`
    font-size: 50px;
    font-weight: 600;
    color: #00b700;
  `;

  const StyledOops = styled.div`
    font-size: 50px;
    font-weight: 600;
    color: red;
  `;

  useEffect(() => {
    if (answer.length >= 5) {
      console.log('game log');
      const payload = {
        gameId,
        userSelect: answer,
      };
      dispatch(putGameLog(payload));
    }
  }, [answer]);

  useEffect(() => {
    if (qNum >= 5) {
      if (count > 0) {
        endAudio.play();
      } else {
        sadendAudio.play();
      }
    }
  }, [qNum]);

  const nextHandler = (e: MouseEvent<HTMLElement>) => {
    if (answer.length < 5) {
      setAnswer([...answer, 4]);
    }
    setQNum(qNum + 1);
    console.log(count);
    console.log(qNum);
  };

  const handler = (e: MouseEvent<HTMLElement>) => {
    const event = e.target as HTMLButtonElement;

    if (!showAns && qNum <= 4) {
      if (`${questionAnswer[qNum]}` === `${event.value}`) {
        // 맞았다는 화면
        setCount(count + 1);
        setCorrect(true);
        console.log('good');
        correctAudio.play();
      } else {
        // 틀렸다는 화면
        oopsAudio.play();
      }
      setAnswer([...answer, event.value]);
      setShowAns(true);
    }
  };

  const nextQuestion = (e: MouseEvent<HTMLElement>) => {
    setQNum(qNum + 1);
    setShowAns(false);
    setCorrect(false);
  };

  const quitHandler = (e: MouseEvent<HTMLElement>) => {
    setQNum(5);
    setShowAns(false);
    setCorrect(false);
    setCount(0);
    setAnswer([4, 4, 4, 4, 4]);
  };

  const handleRestart = () => {
    setQNum(0);
    setAnswer([]);
    setCount(0);
    setShowAns(false);
    setCorrect(false);
    reset();
  };

  const tts = (lang: string, text: string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.lang = lang;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div>
      {qNum < 5 ? (
        <>
          <StyledInterface>{qNum + 1}/5</StyledInterface>
          {showAns ? (
            <>
              <StyledWordWrap>
                {correct ? <StyledCorrect>CORRECT</StyledCorrect> : <StyledOops>Oops!</StyledOops>}
                <StyledWord>The answer is</StyledWord>
                <StyledWord>{Object.values<Array<string>>(questionOption[qNum])[0][questionAnswer[qNum]]}</StyledWord>
              </StyledWordWrap>
              <StyledBtnWrap>
                {Object.values<Array<string>>(questionOption[qNum])[0].map((one: string, idx: Number) => (
                  <>
                    {`${questionAnswer[qNum]}` === `${idx}` ? (
                      <Button
                        color="success"
                        variant="contained"
                        value={`${idx}`}
                        key={'ans' + `${idx}` + `${qNum}`}
                        sx={btnStyle}>
                        {one}
                      </Button>
                    ) : `${answer[qNum]}` === `${idx}` ? (
                      <Button
                        color="error"
                        variant="contained"
                        value={`${idx}`}
                        key={'ans' + `${idx}` + `${qNum}`}
                        sx={btnStyle}>
                        {one}
                      </Button>
                    ) : (
                      <Button variant="contained" value={`${idx}`} key={'ans' + `${idx}` + `${qNum}`} sx={btnStyle}>
                        {one}
                      </Button>
                    )}
                    <Button onClick={() => tts('ko', one)}>
                      <VolumeDownIcon />
                    </Button>
                  </>
                ))}
              </StyledBtnWrap>
              <StyledInterfaceWrap>
                <div />
                <Button
                  variant="contained"
                  onClick={nextQuestion}
                  key={'q' + `${qNum}`}
                  style={{ ...selectTabButtonStyle }}>
                  Next Question
                </Button>
              </StyledInterfaceWrap>
            </>
          ) : (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ margin: 0, padding: 0, width: '100%', minHeight: 50 }}>
                <Button
                  onClick={() =>
                    tts('ko', `${Object.values<Array<string>>(questionOption[qNum])[0][questionAnswer[qNum]]}`)
                  }>
                  <img src={volume} alt="sound" width={200} />
                </Button>
              </Box>
              <StyledBtnWrap>
                {Object.values<Array<string>>(questionOption[qNum])[0].map((one: any, idx: any) => (
                  <Button
                    variant="contained"
                    value={`${idx}`}
                    onClick={handler}
                    key={'option' + `${idx}` + `${qNum}`}
                    sx={btnStyle}>
                    {one}
                  </Button>
                ))}
              </StyledBtnWrap>
              <StyledInterfaceWrap>
                <Button variant="contained" onClick={quitHandler} style={{ ...selectTabButtonStyle }}>
                  quit
                </Button>
                <Button variant="contained" onClick={nextHandler} style={{ ...selectTabButtonStyle }}>
                  next
                </Button>
              </StyledInterfaceWrap>
            </>
          )}
        </>
      ) : (
        <StyledWordWrap>
          <StyledWord>Game End</StyledWord>
          {count < 2 ? (
            <StyledWord>You earned {count} ticket!</StyledWord>
          ) : (
            <StyledWord>You earned {count} tickets!</StyledWord>
          )}
          <img src={ticket[count - 1]} />
          <div>
            <Button
              variant="contained"
              onClick={handleRestart}
              sx={{ width: 200, height: 50, fontSize: 20 }}
              style={{ ...selectTabButtonStyle, margin: 20 }}>
              Restart
            </Button>
            <Link to="/bylot">
              <Button
                variant="contained"
                sx={{ width: 200, height: 50, fontSize: 20 }}
                style={{ ...selectTabButtonStyle, margin: 20 }}>
                Random Draw
              </Button>
            </Link>
          </div>
        </StyledWordWrap>
      )}
    </div>
  );
}
