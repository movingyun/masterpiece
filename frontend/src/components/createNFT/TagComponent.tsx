import React from 'react';
import { Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


type TagProps = {
  defaultTag: string;
  tagHandler: (tagWords:string[]) => void;
}

export default function TagComponent({ defaultTag, tagHandler }:TagProps) {
  // tag datas
  const [chipData, setChipData] = React.useState<string[]>([]);
  let indexArray:number[] = [];
  const [inputData, setInputData] = React.useState("");
  React.useEffect(()=>{
    if(defaultTag){
      setChipData([defaultTag]);
      tagHandler([defaultTag]);
      indexArray = [];
      indexArray.push(0);
    }
  },[defaultTag]);

  // input data
  const onChange = (e:any) => {
    setInputData(e.target.value);
  };

  // 태그 삭제
  const handleDelete = (index: number) => () => {
    const tempChips = chipData.slice();
    tempChips.splice(index, 1);
    setChipData(tempChips);
    tagHandler(tempChips);
  };
  // 태그 추가
  const handleAdd = (e:any) => {
    if(e.keyCode===13){
      const index:number = chipData.indexOf(inputData);
      if(index<0){
        const tempChips = chipData;
        tempChips.push(inputData);
        setChipData(tempChips);
        tagHandler(tempChips);
      }
      setInputData("");
    }
  };
  

  return (
    <>
    <div style={{marginTop:10, marginBottom:10}}>Tag</div>
    <TextField onChange={onChange} onKeyDown={handleAdd} value={inputData}
    placeholder="Press Enter" style={{width:"100%"}}/>
    <div style={{marginTop:10, marginBottom:20}}>
      {chipData.map((data, index:number) => (
        (
          <Chip
            key={data}
            label={data}
            onDelete={(index===0) ? undefined : handleDelete(index)}
            style={{margin:10}}
          />
        )
      ))}
    </div>
    </>
  );
}