import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NftDetailInfo from '../components/NFTDetail/NFTDetailInfo';

export default function NFTDetail() {
  const params = useParams();
  const currentNftAddress = params.nftAddress;

  return <NftDetailInfo nftAddress={`${currentNftAddress}`} />;

  // return (
  //   <>
  //     <div>NFTDetail</div>
  //     <NftDetailInfo nftAddress={`${currentNftAddress}`} />
  //     <div>
  //       <Link to="/nftlist">NFTList</Link>
  //     </div>
  //     <div>
  //       <Link to="/">home</Link>
  //     </div>
  //   </>
  // );
}
