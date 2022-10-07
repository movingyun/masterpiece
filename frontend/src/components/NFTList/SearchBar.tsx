import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, FormControl, InputBase, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { setCategory, setIsSearch, setKeyword } from '../../_slice/NFTSlice';

const Search = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const SearchIconWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;

export default function SearchBar() {
  const keyword = useSelector((state: any) => state.nft.keyword);
  const category = useSelector((state: any) => state.nft.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSearch(!!keyword));
  }, [keyword]);

  const handelKeyword = (e: any) => {
    dispatch(setKeyword(e.target.value));
  };
  const handelCategory = (e: any) => {
    dispatch(setCategory(e.target.value));
  };

  return (
    <Search>
      <FormControl sx={{ minWidth: 160, marginRight: '10px' }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handelCategory}
          sx={{ height: 40 }}>
          <MenuItem value="titlecontent">Title, Content</MenuItem>
          <MenuItem value="tag">Tag</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
          <MenuItem value="creator">Creator</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ height: 40, width: "30%"}}>
        <InputBase
          id="searchBar"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handelKeyword}
          value={keyword}
          fullWidth
          sx={{ height: '100%', border: 1, borderColor: 'rgba(185, 184, 184, 0.87)', borderRadius: 1, padding: 1 }}
        />
      </Box>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
