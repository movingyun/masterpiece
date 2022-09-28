import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Chip, Button, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { fetchNFTDetail } from '../../_slice/NFTSlice';

const StyledDetail = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledChip = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;
const StyledBtn = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;

interface CurrentNftType {
  nftAddress: String;
}

export default function NftDetailInfo({ nftAddress }: CurrentNftType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNFTDetail(nftAddress));
  }, []);

  const currentNFT = useSelector((state: any) => state.nft.currentNFT);

  return (
    <>
      <StyledDetail>
        <Card>
          <CardContent>
            <div>imgUrl {currentNFT.imgUrl}</div>
            <img src={currentNFT.imgUrl} alt="NFT IMG" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div>nftCreatorNickname {currentNFT.nftCreatorNickname}</div>
            <div>nftTitle {currentNFT.nftTitle}</div>
            <div>nftOwnerNickname {currentNFT.nftOwnerNickname}</div>
            <div>nftPrice {currentNFT.nftPrice}</div>
            <div>lastPrice {currentNFT.lastPrice}</div>
            <StyledChip>
              {currentNFT.nftTags.map((tag: String, idx: Number) => (
                <Chip key={`${idx}` + `${currentNFT.imgUrl}`} label={tag} size="small" color="primary" />
              ))}
            </StyledChip>
            <StyledBtn>
              <Button>Sell</Button>
              <Button>Buy</Button>
              <div>nftLike {currentNFT.nftLike}</div>
            </StyledBtn>
          </CardContent>
        </Card>
      </StyledDetail>
      <Card>
        <CardContent>Description</CardContent>
      </Card>
      <Card>
        <CardContent>Price</CardContent>
      </Card>
    </>
  );
}
