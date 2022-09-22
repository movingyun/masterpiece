import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import tmpImg from '../../img/tmpImg.PNG';

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default function Draw() {
  return (
    <>
      <StyledFlex>
        <div>Random Draw</div>
        <div>
          <span>Tickets</span>
          <span>(?)</span>
        </div>
      </StyledFlex>
      <StyledFlex>
        <div>
          <Card sx={{ maxWidth: 575 }}>
            <StyledFlex>
              <CardMedia
                component="img"
                height="150"
                image={tmpImg}
                alt="Consonant img"
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
              <div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Consonant
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    자음에 대한 설명을 여기에 영어로 쭉쭉쭉 써주고 무슨 자음이 있는지도 같이 알려주면 좋을 것 같아요.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Draw</Button>
                  <Button size="small">View List</Button>
                </CardActions>
              </div>
            </StyledFlex>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 575 }}>
            <StyledFlex>
              <CardMedia
                component="img"
                height="150"
                image={tmpImg}
                alt="Consonant img"
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
              <div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Vowel
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    모음에 대한 설명을 여기에 영어로 쭉쭉쭉 써주고 무슨 자음이 있는지도 같이 알려주면 좋을 것 같아요.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Draw</Button>
                  <Button size="small">View List</Button>
                </CardActions>
              </div>
            </StyledFlex>
          </Card>
        </div>
      </StyledFlex>
      <div>inventory</div>
    </>
  );
}
