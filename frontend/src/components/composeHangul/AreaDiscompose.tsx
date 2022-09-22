import React from "react";
import { Box } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';

export default function AreaDiscompose(){
  return (
    <Box display="flex" justifyContent="center" alignItems="center"
    style={{width:"100%", minHeight:200, backgroundColor:"#F8CECE", border:"1px dashed black"}}>
      <RestoreIcon sx={{width:"30%", height:"30%"}}/>
    </Box>
  );
}