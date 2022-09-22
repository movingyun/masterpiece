import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import tmpImg from '../img/tmpImg.PNG';

interface LetterCardType {
  description: String;
  title: String;
  letter: String;
  quantity: Number;
}

export default function LetterCard({ description, title, letter, quantity }: LetterCardType) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* 이미지 링크 수정필요함 */}
      <CardMedia component="img" height="150" image={tmpImg} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity : {`${quantity}`}
          <br />
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
