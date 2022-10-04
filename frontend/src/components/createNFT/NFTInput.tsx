/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, TextField, Autocomplete, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createNFTActions } from '../../_slice/CreateNFTSlice';



function NFTInfo() {
  const dispatch = useDispatch();
  const title = useSelector((state: any) => state.createNFT.title);
  const description = useSelector((state: any) => state.createNFT.description);
  const tags = useSelector((state: any) => state.createNFT.tag);
  const hangulSentence = useSelector((state: any) => state.areaSentence.value)
                              .filter((char: string) => char !== '\n')
                              .join('');
  const fixedOptions = [hangulSentence];


  const titleHandler = (event: any) => {
    dispatch(createNFTActions.title(event.target.value));
  }
  const descriptionHandler = (event: any) => {
    dispatch(createNFTActions.description(event.target.value));
  };
  const tagHandler = (word: string[]) => {
    dispatch(createNFTActions.tag(word));
  };

  return (
    <Box sx={{ width: 512, maxWidth: '100%'}}>
      <div style={{ margin: '10px 0' }}>Title</div>
      <TextField
        required
        fullWidth
        id="outlined-search"
        label="Required"
        type="search"
        onChange={titleHandler}
        value={title}
        placeholder="Title of your NFT"
      />
      <div style={{ margin: '10px 0' }}>Description</div>
      <TextField
        required
        fullWidth
        id="outlined-multiline-static"
        label="Required"
        multiline
        onChange={descriptionHandler}
        value={description}
        rows={4}
        placeholder="Describe your NFT"
      />
      <Autocomplete
        multiple
        freeSolo
        autoSelect
        disableClearable
        id="fixed-tags-demo"
        defaultValue={[hangulSentence]}
        onChange={(event, newValue) => {
          tagHandler([...fixedOptions, ...newValue.filter(option => fixedOptions.indexOf(option) === -1)]);
        }}
        options={tags}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} disabled={fixedOptions.indexOf(option) !== -1} />
          ))
        }
        style={{ margin: '10px 0' }}
        renderInput={params => <TextField {...params} label="Tags" placeholder="Press enter" />}
      />
    </Box>
  );
}

export default NFTInfo