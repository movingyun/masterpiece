import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import tmpImg from '../../img/tmpImg.PNG';
import consonantImg from '../../img/발성기관.PNG';
import vowelImg from '../../img/천지인.PNG';
import { pickConsonant, pickVowel } from '../../_slice/HangulSlice';
import SimpleDialog from './SimpleDialog';
import { fetchTicket } from '../../_slice/UserSlice';

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function Draw() {
  const dispatch = useDispatch();

  const pickSuccess = useSelector((state: any) => state.hangul.pickSuccess);
  const pickResult = useSelector((state: any) => state.hangul.pickResult);
  const walletAddress = useSelector((state: any) => state.user.currentUser.wallet_address);
  const ticket = useSelector((state: any) => state.user.ticket);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (walletAddress) dispatch(fetchTicket(walletAddress));
  }, [walletAddress]);

  useEffect(() => {
    if (pickSuccess) console.log(pickResult);
    else console.log('NO TICKETS');
  }, [pickSuccess]);

  const handlePickConsonant = () => {
    const payload = {
      quantity: 1,
      userWalletAddress: walletAddress,
    };
    if (walletAddress) {
      dispatch(pickConsonant(payload));
    }
    setOpen(true);
  };

  const handlePickVowel = () => {
    const payload = {
      quantity: 1,
      userWalletAddress: walletAddress,
    };
    if (walletAddress) {
      dispatch(pickVowel(payload));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledFlex>
        <div>Random Draw</div>
        <div>
          <span>Tickets : {ticket}</span>
        </div>
      </StyledFlex>
      <StyledFlex>
        {/* 자음 뽑기 */}
        <div>
          <Card sx={{ maxWidth: 575 }}>
            <StyledFlex>
              <CardMedia
                component="img"
                height="150"
                image={consonantImg}
                alt="Consonant img"
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
              <div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Consonants
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Based on five basic consonants modeled after the shape of the pronunciation organ (‘ㄱ’, ‘ㄴ’, ‘ㅁ’,
                    ‘ㅅ’, ‘ㅇ’), these were created by adding strokes or overlapping the same consonants.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handlePickConsonant}>
                    Draw
                  </Button>
                  <Button size="small">View List</Button>
                </CardActions>
              </div>
            </StyledFlex>
          </Card>
        </div>
        {/* 모음 뽑기 */}
        <div>
          <Card sx={{ maxWidth: 575 }}>
            <StyledFlex>
              <CardMedia
                component="img"
                height="150"
                image={vowelImg}
                alt="Consonant img"
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
              <div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Vowels
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Vowel letters are based on sky, earth and man. ‘·’ symbolizes the round shape of the sky, ‘ㅡ’
                    symbolizes the flat shape of the earth, and ‘ㅣ’ symbolizes the shape of a person standing upright.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handlePickVowel}>
                    Draw
                  </Button>
                  <Button size="small">View List</Button>
                </CardActions>
              </div>
            </StyledFlex>
          </Card>
        </div>
      </StyledFlex>
      {/* 카드 뽑기 결과 Dialog */}
      <SimpleDialog pickSuccess={pickSuccess} pickResult={pickResult} open={open} onClose={handleClose} />
    </>
  );
}
