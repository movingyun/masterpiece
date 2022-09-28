import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchNFTDetail } from '../../_slice/NFTSlice';

interface CurrentNftType {
  nftAddress: String;
}

export default function NftDetailInfo({ nftAddress }: CurrentNftType) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNFTDetail(nftAddress));
  }, []);

  return (
    <>
      <div>1</div>
      <div>1</div>
    </>
  );
}
