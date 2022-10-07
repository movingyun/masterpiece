import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SellFunction from './SellFunction';
import spinner from '../../img/spinner.gif';
import { fetchSaleHistory } from '../../_slice/SaleSlice';
import { fetchNFTDetail, fetchNFTOwner } from '../../_slice/NFTSlice';

const StyledWord = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const PriceTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  p: '0',
  borderBottom: '0',
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const spinnerStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export default function SellModal() {
  const dispatch = useDispatch();
  const [end, setEnd] = React.useState(false);
  const [contract, setContract] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setEnd(false);
  };
  const handleClose = () => setOpen(false);
  const [openLoading, setOpenLoading] = React.useState(false);
  const handleOpenLoading = () => setOpenLoading(true);
  const handleCloseLoading = () => {
    dispatch(fetchSaleHistory(nftAddress));
    dispatch(fetchNFTOwner(nftAddress));
    dispatch(fetchNFTDetail(nftAddress));
    setOpenLoading(false);
    setOpen(false);
  };
  const tokenId = useSelector((state: any) => state.nft.currentNFT.tokenId);
  const nftAddress = useSelector((state: any) => state.nft.currentNFT.nftAddress);

  const [coin, setCoin] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };

  const [price, setPrice] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleListing = async () => {
    if (parseInt(price, 10) > 0 && tokenId && nftAddress) {
      handleOpenLoading();
      const success: any = await SellFunction(price, tokenId, nftAddress);
      if (success) {
        console.log('success!!');
        setContract(true);
      } else {
        console.log('fail!!');
        setContract(false);
      }
      setEnd(true);
    }
  };

  return (
    <>
      <Button size="large" sx={{ width: '70px' }} onClick={handleOpen}>
        Sell
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Sell your Item
          </Typography>
          <hr />
          <Accordion defaultExpanded sx={{ border: 0, boxShadow: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography id="modal-modal-title" variant="h6">
                <SellIcon /> Set Price
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <hr />
              <Typography id="modal-modal-description" sx={{ padding: 2 }} variant="h6" component="div">
                Price
              </Typography>
              <Box display="flex" sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, flexGrow: 1 }}>
                  <InputLabel id="demo-simple-select-label">Coin</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={coin}
                    label="Select"
                    defaultValue="SSF"
                    onChange={handleChange}>
                    <MenuItem value="SSF">SSF</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, flexGrow: 1 }}>
                  <TextField
                    id="outlined-basic"
                    value={price}
                    label="Price"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Button variant="contained" onClick={handleListing}>
            Complete listing
          </Button>
        </Box>
      </Modal>
      <Modal open={openLoading} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={spinnerStyle}>
          {end ? (
            contract ? (
              <>
                <StyledWord>Contract Success</StyledWord>
                <Button onClick={handleCloseLoading} style={PriceTitle}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <StyledWord>Contract Fail</StyledWord>
                <Button onClick={handleCloseLoading} style={PriceTitle}>
                  Close
                </Button>
              </>
            )
          ) : (
            <>
              <StyledWord>Loading Contract</StyledWord>
              <StyledWord>Wait a minute</StyledWord>
              <img src={spinner} alt="스피너" />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
