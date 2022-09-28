import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchAllNFT, NFT } from '../../_slice/NFTSlice';
import NFTCard from '../../commons/NFTCard';

const StyledCardList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  > * {
    margin: 10px;
    min-width: 277px;
    text-decoration: none;
  }
`;

export default function NFTCardList() {
  const dispatch = useDispatch();

  const NFTAll = useSelector((state: any) => state.nft.NFTAll);

  useEffect(() => {
    dispatch(fetchAllNFT());
  }, []);

  return (
    <StyledCardList>
      {NFTAll.map((NFTInfo: NFT, idx: Number) => (
        <Link to="/nftdetail" key={`${idx}` + NFTInfo.imgUrl}>
          <NFTCard
            imgUrl={NFTInfo.imgUrl}
            nftTitle={NFTInfo.nftTitle}
            ntfPrice={NFTInfo.ntfPrice}
            nftCreatorNickname={NFTInfo.nftCreatorNickname}
            lastPrice={NFTInfo.lastPrice}
            nftOwnerNickname={NFTInfo.nftOwnerNickname}
            nftTags={NFTInfo.nftTags}
            nftLike={NFTInfo.nftLike}
          />
        </Link>
      ))}
    </StyledCardList>
  );
}
