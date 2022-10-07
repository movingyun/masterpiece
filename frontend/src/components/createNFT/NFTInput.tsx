/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Box, TextField, Autocomplete, Chip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { UseSelectorHook } from '../../_hook/HangulMakerHook';
import { createNFTActions } from '../../_slice/CreateNFTSlice';
import TagComponent from './TagComponent';



function NFTInfo() {
  const dispatch = useDispatch();
  const title = UseSelectorHook(state => state.createNFT.title);
  const description = UseSelectorHook(state => state.createNFT.description);
  const tags = UseSelectorHook(state => state.createNFT.tag);
  const hangulSentence = UseSelectorHook(state => state.areaSentence.value)
                              .filter((char: string) => char !== '\n')
                              .join('');
  const fixedOptions = [hangulSentence];


  const titleHandler = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(createNFTActions.title(event.target.value));
  };
  const descriptionHandler = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(createNFTActions.description(event.target.value));
  };
  const tagHandler = (tagWords: string[]) => {
    dispatch(createNFTActions.tag(tagWords));
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
      {/* <TagComponent defaultTag={hangulSentence} tagHandler ={tagHandler} /> */}
    </Box>
  );
}

export default NFTInfo