import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NFTCardList from '../components/NFTList/NFTCardList';
import SearchBar from '../components/NFTList/SearchBar';
import SearchedList from '../components/NFTList/SearchedList';

export default function NFTList() {
  const keyword = useSelector((state: any) => state.nft.keyword);

  return (
    <>
      <div>NFTList</div>
      <SearchBar />
      {keyword ? <SearchedList /> : <NFTCardList />}
      <div>
        <Link to="/userpage">userPage</Link>
      </div>
      <div>
        <Link to="/nftdetail">NFTDetail</Link>
      </div>
      <div>
        <Link to="/">home</Link>
      </div>
    </>
  );
}
