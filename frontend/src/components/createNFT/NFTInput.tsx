import React, { useState } from 'react'
import { Box, TextField, Autocomplete } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { createNFTActions } from '../../_slice/CreateNFTSlice';



function NFTInfo() {
  
  const dispatch = useDispatch();
  const title = useSelector((state: any) => state.createNFT.title);
  const description = useSelector((state: any) => state.createNFT.description);
  const tags = useSelector((state: any) => state.createNFT.tag);
  // const [tags, setTags] = useState<string[]>(["세종대왕만세!"]);

  const titleHandler = (event: any) => {
    console.log(event)
    dispatch(createNFTActions.title(event.target.value));
  }
  const descriptionHandler = (event: any) => {
    dispatch(createNFTActions.description(event.target.value));
  };
  const tagHandler = (event: any) => {
    dispatch(createNFTActions.tag(event.target.value.join(' ')));
  };

  return (
    <Box sx={{ width: 512, maxWidth: '100%' }}>
      <div>Title</div>
      <TextField
        required
        fullWidth
        id="outlined-search"
        label="Title"
        type="search"
        onChange={titleHandler}
        value={title}
        placeholder="Title of your NFT"
      />
      <div>Description</div>
      <TextField
        required
        fullWidth
        id="outlined-multiline-static"
        label="Description"
        multiline
        onChange={descriptionHandler}
        value={description}
        rows={4}
        placeholder="Describe your NFT"
      />
      <Autocomplete
        style={{ margin: '10px 0' }}
        multiple
        id="tags-outlined"
        options={tags}
        defaultValue={[...tags]}
        freeSolo
        autoSelect
        onChange={e => {
          const tagInput = (e.target as HTMLInputElement).value;
          tagHandler([...tags, tagInput]);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={params => <TextField {...params} label="Tags" placeholder="Tags" value={tags} />}
      />
    </Box>
  );
}

export default NFTInfo