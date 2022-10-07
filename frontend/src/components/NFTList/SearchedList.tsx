import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NFT, searchNFT } from '../../_slice/NFTSlice';
import NFTCard from '../../commons/NFTCard';

const StyledCardList = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, minmax(277px, auto));
  > * {
    text-decoration: none;
  }
`;

export default function SearchedList() {
  const dispatch = useDispatch();
  const keyword = useSelector((state: any) => state.nft.keyword);
  const category = useSelector((state: any) => state.nft.category);
  const searchedNFT = useSelector((state: any) => state.nft.searchedNFT);

  useEffect(() => {
    dispatch(searchNFT({ category, keyword }));
  });

  return (
    <StyledCardList>
      {searchedNFT.map((NFTInfo: NFT, idx: Number) => (
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
            tokenId={NFTInfo.tokenId}
            isSale={NFTInfo.isSale}
          />
        </Link>
      ))}
    </StyledCardList>
  );
}
