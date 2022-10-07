import React from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector, useDispatch } from 'react-redux';
import CategoryIcon from '@mui/icons-material/Category';
import styled from 'styled-components';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NFTPreview from '../../commons/NFTPreview';
import BuyFunction from './BuyFunction';
import spinner from '../../img/spinner.gif';
import { fetchSaleHistory } from '../../_slice/SaleSlice';
import { fetchNFTDetail, fetchNFTOwner } from '../../_slice/NFTSlice';

const StyledCard = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    border: none;
    box-shadow: none !important;
  }
`;

const Creater = styled.div`
  font-size: 15px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const StyledChip = styled.div`
  display: flex;
  > * {
    margin: 2px;
  }
`;

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
const LastPriceTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  p: '0',
  borderBottom: '0',
};
const Price = {
  fontSize: '20px',
  padding: '0',
  fontWeight: 'bold',
  borderBottom: '0',
  width: 70,
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
const AccordionTitle = {
  display: 'flex',
  alignItems: 'center',
};

export default function BuyModal() {
  const dispatch = useDispatch();
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
  const [value, setValue] = React.useState('SSF');
  const [end, setEnd] = React.useState(false);
  const [contract, setContract] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const tokenId = useSelector((state: any) => state.nft.currentNFT.tokenId);
  const nftAddress = useSelector((state: any) => state.nft.currentNFT.nftAddress);
  const currentNFT = useSelector((state: any) => state.nft.currentNFT);
  const handlePurchase = async () => {
    if (parseInt(currentNFT.nftPrice, 10) > 0 && tokenId && nftAddress) {
      handleOpenLoading();
      const success: any = await BuyFunction(currentNFT.nftPrice, tokenId, nftAddress);
      if (success) {
        setContract(true);
      } else {
        setContract(false);
      }
      setEnd(true);
    }
  };

  return (
    <>
      <Button size="large" sx={{ width: '70px' }} onClick={handleOpen}>
        Buy
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Complete checkout
          </Typography>
          <hr />
          <Accordion defaultExpanded sx={{ border: 0, boxShadow: 0 }}>
            {/* NFT 정보 */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography id="modal-modal-title" variant="h6" sx={AccordionTitle}>
                <CategoryIcon /> Item
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <hr />
              <StyledCard>
                <Card sx={{ width: '30%' }}>
                  <NFTPreview url={`${currentNFT.imgUrl}`} />
                </Card>
                <Card sx={{ width: '30%' }}>
                  <CardContent>
                    <Typography id="modal-modal-description" variant="body1" component="div">
                      <Creater>{currentNFT.nftCreatorNickname}</Creater>
                      <Title>{currentNFT.nftTitle}</Title>
                    </Typography>
                    <StyledChip>
                      {currentNFT.nftTags.map((tag: String, idx: Number) => (
                        <Chip key={`${idx}` + `${currentNFT.imgUrl}`} label={tag} size="small" color="primary" />
                      ))}
                    </StyledChip>
                  </CardContent>
                </Card>
                <Card sx={{ width: '40%', display: 'flex', flexDirection: 'row-reverse' }}>
                  <CardContent sx={{ width: '70%' }}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={PriceTitle}>Price</TableCell>
                            <TableCell sx={Price} align="center">
                              {currentNFT.nftPrice} SSF
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={LastPriceTitle}>Last Price</TableCell>
                            <TableCell sx={Price} align="center">
                              {currentNFT.lastPrice ? `${currentNFT.lastPrice} ${value}` : '-'}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </StyledCard>
            </AccordionDetails>
          </Accordion>
          {/* 지불 수단 선택 */}
          <Accordion sx={{ border: 0, boxShadow: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography id="modal-modal-title" variant="h6" sx={AccordionTitle}>
                <MonetizationOnIcon />
                <div> Payment Method</div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <hr />
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="SSF"
                  name="radio-buttons-group"
                  onChange={handleChange}>
                  <FormControlLabel value="SSF" control={<Radio />} label="SSF" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Button variant="contained" onClick={handlePurchase}>
            Complete purchase
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
