import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useDispatch, useSelector } from 'react-redux';
import tmpImg from '../../img/tmpImg.PNG';
import consonantImg from '../../img/발성기관.PNG';
import vowelImg from '../../img/천지인.PNG';
import { pickConsonant, pickVowel } from '../../_slice/HangulSlice';
import SimpleDialog from './SimpleDialog';
import { fetchTicket } from '../../_slice/UserSlice';
import { defaultBackground, selectTabButtonStyle, yellow } from '../../_css/ReactCSSProperties';

const StyledContainer = styled.div`
  margin: 20px 0 40px;
`;
const StyledTicket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
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
  }, [walletAddress, open]);

  useEffect(() => {
    if (pickSuccess) console.log(pickResult);
    else console.log('NO TICKETS');
  }, [pickSuccess]);

  const handlePickConsonant = async () => {
    const payload = {
      quantity: 1,
      userWalletAddress: walletAddress,
    };
    if (walletAddress) {
      await dispatch(pickConsonant(payload));
    }
    setOpen(true);
  };

  const handlePickVowel = async () => {
    const payload = {
      quantity: 1,
      userWalletAddress: walletAddress,
    };
    if (walletAddress) {
      await dispatch(pickVowel(payload));
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledContainer style={{marginTop:20, padding:20}}>
      <StyledFlex>
        <Typography gutterBottom variant="h4" component="div" sx={{ fontFamily: 'Poppins, san-serif' }}>
          Random Draw
        </Typography>
        <StyledTicket>
          <ConfirmationNumberIcon />
          <div style={{ marginLeft: '5px' }}>Tickets : {ticket}</div>
        </StyledTicket>
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Poppins, san-serif' }}>
                    Consonants
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, san-serif' }}>
                    Based on five basic consonants modeled after the shape of the pronunciation organ (‘ㄱ’, ‘ㄴ’, ‘ㅁ’,
                    ‘ㅅ’, ‘ㅇ’), these were created by adding strokes or overlapping the same consonants.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handlePickConsonant} style={{...selectTabButtonStyle, border:"none"}}>
                    Draw
                  </Button>
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
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'Poppins, san-serif' }}>
                    Vowels
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, san-serif' }}>
                    Vowel letters are based on sky, earth and man. ‘·’ symbolizes the round shape of the sky, ‘ㅡ’
                    symbolizes the flat shape of the earth, and ‘ㅣ’ the shape of a person standing upright.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handlePickVowel} style={{...selectTabButtonStyle, border:"none"}}>
                    Draw
                  </Button>
                </CardActions>
              </div>
            </StyledFlex>
          </Card>
        </div>
      </StyledFlex>
      {/* 카드 뽑기 결과 Dialog */}
      <SimpleDialog pickSuccess={pickSuccess} pickResult={pickResult} open={open} onClose={handleClose} />
    </StyledContainer>
  );
}
