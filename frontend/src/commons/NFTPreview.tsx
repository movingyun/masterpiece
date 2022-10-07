import React from 'react';
import styled from 'styled-components';
import { CardContent } from '@mui/material';
import logo from '../img/logo.png';

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
`;
const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

interface PreviewType {
  url: String;
}

export default function NFTPreview({ url }: PreviewType) {
  // eslint-disable-next-line react/destructuring-assignment
  const arr = url.split('.');
  const type = arr[arr.length - 1];
  // console.log(type);

  return (
    <CardContent>
      {url === 'null' ? (
        <StyledImg src={logo} alt="img" />
      ) : type === 'webm' ? (
        <StyledVideo autoPlay loop src={`${url}`} />
      ) : (
        <StyledImg src={`${url}`} alt="img" />
      )}
    </CardContent>
  );
}
