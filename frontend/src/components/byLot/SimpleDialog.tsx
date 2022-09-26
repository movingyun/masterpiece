import React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LetterCard from '../../commons/LetterCard';

const StyledBox = styled.div`
  padding: 10px 20px;
`;
const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export interface PickType {
  pickResult: any;
  onClose: (value: string) => void;
  open: boolean;
  pickSuccess: Boolean;
}

export default function SimpleDialog(props: PickType) {
  const { onClose, pickResult, open, pickSuccess } = props;

  const handleClose = () => {
    onClose('');
  };

  return (
    <div>
      {pickSuccess ? (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Congratulations</DialogTitle>
          {pickResult.map((one: any, idx: number) => (
            <LetterCard
              description={one.description}
              title={one.title}
              letter={one.letter}
              key={'pickConsonant' + `${idx}`}
            />
          ))}
          <Button onClick={handleClose}>Close</Button>
        </Dialog>
      ) : (
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>No Ticket</DialogTitle>
          <StyledBox>
            <div>If you want to do more draws, get a ticket.</div>
            <div>Tickets can be obtained through the game.</div>

            <StyledButtons>
              <Link to="/hangulgame">
                <Button>Play Game</Button>
              </Link>
              <Button onClick={handleClose}>Close</Button>
            </StyledButtons>
          </StyledBox>
        </Dialog>
      )}
    </div>
  );
}
