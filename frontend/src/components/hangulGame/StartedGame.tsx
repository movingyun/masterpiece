import { Button } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { putGameLog, QuestionType } from '../../_slice/GameSlice';

export default function StartedGame() {
  const dispatch = useDispatch();
  const gameId = useSelector((state: any) => state.game.gameId);
  const questionOption = useSelector((state: any) => state.game.questionOption);
  const questionAnswer = useSelector((state: any) => state.game.questionAnswer);
  const [qNum, setQNum] = useState(0);
  const [answer, setAnswer] = useState<any[]>([]);

  const handler = (e: MouseEvent<HTMLElement>) => {
    const event = e.target as HTMLButtonElement;

    if (qNum <= 4) {
      console.log(questionAnswer[qNum] === event.value);
      console.log(questionAnswer[qNum]);
      console.log(event.value);
      setAnswer([...answer, event.value]);
      setQNum(qNum + 1);
    } else {
      for (let i = 0; i < questionAnswer.length; i++) {
        console.log(questionAnswer[i] === answer[i]);
        // if(questionAnswer[i] === answer[i]){
        // }else{

        // }
      }

      const payload = {
        gameId,
        userSelect: answer,
      };
      dispatch(putGameLog(payload));
    }
    console.log();
  };

  return (
    <>
      <div>
        <div>sound btn</div>
        {questionOption[Object.keys(questionOption)[qNum]][questionAnswer[qNum]]}
      </div>
      <div>
        <div>options</div>
        {questionOption[Object.keys(questionOption)[qNum]].map((one: String, idx: Number) => (
          <Button variant="contained" value={qNum} onClick={handler} key={'option' + `${idx}` + `${qNum}`}>
            {one}
          </Button>
        ))}
      </div>
      <div>
        <div>interface</div>
        <Button onClick={handler}>next</Button>
      </div>
    </>
  );
}
