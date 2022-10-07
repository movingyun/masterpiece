import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Chip, Container } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';
import NFTimage from '../img/tmpImg.PNG';
import { NFT } from '../_slice/NFTSlice';
import { black, yellow, white } from '../_css/ReactCSSProperties';

const StyledChip = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;

const StyledCard = styled.div``;
const StyledCardDescription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export default function NFTCard({
  imgUrl,
  nftTitle,
  nftPrice,
  nftCreatorNickname,
  lastPrice,
  nftOwnerNickname,
  nftTags,
  nftLike,
  nftAddress,
  tokenId,
  isSale,
}: NFT) {
  const videoElement:JSX.Element = <video autoPlay loop muted width={140} height={140} src={imgUrl}
  style={{border:`4px solid ${white.toString()}`}}/>
  return (
    <Card sx={{ maxWidth: 400, paddingTop: '16px', borderRadius: '15px', background: yellow.toString()
    // }}>
    , boxShadow:'none', }}>
    {/* border:`2px solid ${black.toString()}`, }}> */}
      <CardActionArea>
        {/* <CardMedia component="video" height="140" image={imgUrl} autoPlay loop */}
        <Container style={{textAlign:"center"}}>{videoElement}</Container>
        <CardContent>
          <StyledChip>
            {nftTags.map((tag, idx) => (
              <Chip key={`${idx}` + `${imgUrl}`} label={tag} size="small" style={{background:black.toString(), color:white.toString()}} />
            ))}
          </StyledChip>
          <StyledCard>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ marginTop:2, fontWeight: 600, fontFamily: '"Poppins", san-serif' }}
              noWrap>
              {nftTitle}
            </Typography>
            <StyledCardDescription>
              <div>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="div"
                  sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                  Price : {nftPrice}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                  Last sale : {lastPrice}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                  Creator : {nftCreatorNickname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                  Owner : {nftOwnerNickname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
                  Like : {`${nftLike}`}
                </Typography>
              </div>
            </StyledCardDescription>
          </StyledCard>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
