import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import styled from 'styled-components';
import tmpImg from '../img/한지.jpg';

const StyledWrapper = styled.div`
  position: relative;
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

interface LetterCardType {
  description: String;
  title: String;
  letter: String;
  quantity?: Number;
  margin?: boolean;
}

LetterCard.defaultProps = {
  quantity: null,
};

export default function LetterCard({ description, title, letter, quantity, margin }: LetterCardType) {
  return (
    <Card sx={{ maxWidth: 290, height:380 }}>
      {/* 이미지 링크 수정필요함 */}
      <StyledWrapper>
        <CardMedia component="img" height="150" image={tmpImg} alt="green iguana" />
        <StyledLetter style={{marginTop:(margin) ? 40 : 0}}>{letter}</StyledLetter>
      </StyledWrapper>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: '"Poppins", "Namsan", san-serif' }}>
          {title}
        </Typography>
        {quantity ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, san-serif' }}>
            Quantity : {`${quantity}`}
            <br />
            Letter: {`${letter}`}
            <br />
            {description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, san-serif' }}>
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
LetterCard.defaultProps = {
  margin: false,
}