import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Chip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';
import NFTimage from '../img/tmpImg.PNG';
import { NFT } from '../_slice/NFTSlice';

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
  return (
    <Card sx={{ maxWidth: 290, paddingTop: '16px', borderRadius: '15px' }}>
      <CardActionArea>
        <CardMedia component="video" height="140" image={imgUrl} autoPlay loop />
        <CardContent>
          <StyledChip>
            {nftTags.map((tag, idx) => (
              <Chip key={`${idx}` + `${imgUrl}`} label={tag} size="small" color="primary" />
            ))}
          </StyledChip>
          <StyledCard>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 600, fontFamily: '"Poppins", san-serif' }}
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
