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
        <Link to={`/nftdetail/${NFTInfo.nftAddress}`} key={`${idx}` + NFTInfo.imgUrl}>
          <NFTCard
            imgUrl={NFTInfo.imgUrl}
            nftTitle={NFTInfo.nftTitle}
            nftPrice={NFTInfo.nftPrice}
            nftCreatorNickname={NFTInfo.nftCreatorNickname}
            lastPrice={NFTInfo.lastPrice}
            nftOwnerNickname={NFTInfo.nftOwnerNickname}
            nftTags={NFTInfo.nftTags}
            nftLike={NFTInfo.nftLike}
            nftAddress={NFTInfo.nftAddress}
            nftDescription={NFTInfo.nftDescription}
            nftOwnerWallet={NFTInfo.nftOwnerWallet}
          />
        </Link>
      ))}
    </StyledCardList>
  );
}
