import React, { useEffect, useState } from 'react';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Card from '@mui/material/Card';
import { hover } from '@testing-library/user-event/dist/hover';
import LetterCard from '../../commons/LetterCard';
import tmpImg from '../../img/한지.jpg';
import pick from '../../audio/pick.mp3';
import hangul from '../../audio/hangul.mp4';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLetter = styled.span`
  position: absolute;
  top: 20%;
  left: 32%;
  z-index: 1;
  color: black;
  font-size: 100px;
  font-weight: bold;
`;

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
    setAlert(true);
  };

  const ttsBtn = () => {
    if (pickResult.length > 0 && open) {
      const result = pickResult[0].title.split('[');
      tts('ko', result[0]);
    }
  };

  const tts = (lang: string, text: string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.lang = lang;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  // 뽑기 소리, 영상
  const [alert, setAlert] = useState(true);
  const pickAudio = new Audio(pick);

  useEffect(() => {
    console.log(pickResult.length);
    console.log(`${open}`);
    if (open && pickSuccess) {
      pickAudio.play();
      const timer = setTimeout(() => {
        setAlert(false);
        console.log(`close`);
      }, 7000);
    }
  }, [open]);

  return (
    <div>
      {pickSuccess ? (
        <>
          <Dialog open={open}>
            <DialogTitle sx={{ fontWeight: 800 }}>
              <CelebrationIcon />
              <span style={{ marginLeft: '5px' }}>Congratulations!</span>
            </DialogTitle>
            {pickResult.map((one: any, idx: number) => (
              <Card sx={{ maxWidth: 290, height: 380 }}>
                {/* 이미지 링크 수정필요함 */}
                <CardMedia component="img" height="150" image={tmpImg} alt="green iguana" />
                <StyledLetter>{one.letter}</StyledLetter>
                <CardContent>
                  <StyledWrapper>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                      {one.title}
                    </Typography>
                    <VolumeUpIcon onClick={ttsBtn} style={{ cursor: 'pointer' }} />
                  </StyledWrapper>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, san-serif' }}>
                    {one.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Button onClick={handleClose}>Close</Button>
          </Dialog>
          {alert ? (
            <Dialog open={open} maxWidth="lg">
              <video muted autoPlay width="100%" src={hangul} style={{ zIndex: 2 }} />
            </Dialog>
          ) : null}
        </>
      ) : (
        <Dialog open={open}>
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
