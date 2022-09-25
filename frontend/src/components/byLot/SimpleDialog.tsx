import React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import LetterCard from '../../commons/LetterCard';

export interface PickConsonantType {
  open: boolean;
  pickConsonantResult: any;
  onClose: (value: string) => void;
}

export default function SimpleDialog(props: PickConsonantType) {
  const { onClose, pickConsonantResult, open } = props;

  const handleClose = () => {
    onClose('');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Congratulations</DialogTitle>
      {pickConsonantResult.map((one: any, idx: number) => (
        // 출력 테스트
        <LetterCard
          description={one.description}
          title={one.title}
          letter={one.letter}
          key={'pickConsonant' + `${idx}`}
        />
      ))}
      <Button onClick={handleClose}>Close</Button>
    </Dialog>
  );
}
