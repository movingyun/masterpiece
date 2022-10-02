import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { setIsSearch, setKeyword } from '../../_slice/NFTSlice';

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchIconWrapper = styled.div`
  padding-right: 10px;
`;

export default function SearchBar() {
  const keyword = useSelector((state: any) => state.nft.keyword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSearch(!!keyword));
  }, [keyword]);

  const handelKeyword = (e: any) => {
    dispatch(setKeyword(e.target.value));
    // dispatch(setCategory(e.target.value));
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <InputBase
        id="searchBar"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handelKeyword}
        value={keyword}
      />
    </Search>
  );
}
