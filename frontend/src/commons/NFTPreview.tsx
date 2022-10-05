import React from 'react';
import styled from 'styled-components';
import { CardContent } from '@mui/material';

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
  // console.log(arr);
  const type = arr[arr.length - 1];
  // console.log(type);

  return (
    <CardContent>
      {/* url 받아서 테스트 해볼것 */}
      {type === 'webm' ? <StyledVideo autoPlay loop src={`${url}`} /> : <StyledImg src={`${url}`} alt="img" />}
    </CardContent>
  );
}
