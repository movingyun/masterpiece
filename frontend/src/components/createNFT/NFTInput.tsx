/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
import { Box, TextField, Autocomplete, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createNFTActions } from '../../_slice/CreateNFTSlice';



function NFTInfo() {
  // const [inputValue, setInputValue] = React.useState('');
  
  const dispatch = useDispatch();
  const title = useSelector((state: any) => state.createNFT.title);
  const description = useSelector((state: any) => state.createNFT.description);
  const tags = useSelector((state: any) => state.createNFT.tag);
  // const [tags, setTags] = useState<string[]>(["세종대왕만세!"]);
  const hangulSentence = useSelector((state: any) => state.areaSentence.value)
                              .filter((char: string) => char !== '\n')
                              .join('');
  // tags.push(hangulSentence); // default tag
  const fixedOptions = [hangulSentence];


  const titleHandler = (event: any) => {
    // console.log(event.targetx`.value);
    dispatch(createNFTActions.title(event.target.value));
  }
  const descriptionHandler = (event: any) => {
    // console.log(event.target.value);
    dispatch(createNFTActions.description(event.target.value));
  };
  const tagHandler = (word: string[]) => {
    // console.log(word);
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
      {/* <TagsInput
        selectedTags={tagHandler}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
      /> */}
      {/* <Autocomplete
        style={{ margin: '10px 0' }}
        multiple
        id="tags-outlined"
        options={tags}
        defaultValue={[hangulSentence]}
        freeSolo
        autoSelect
        onChange={e => {
          const tagInput = (e.target as HTMLInputElement).value;
          console.log(tagInput);
          tagHandler([...tags, tagInput]);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={params => <TextField {...params} label="Tags" placeholder="Tags" value={tags} />}
      /> */}
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
        // getOptionLabel={tags}
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