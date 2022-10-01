import React from 'react';
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
} from '@mui/material';
import SellIcon from '@mui/icons-material/Sell';

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
};

export default function SellModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [coin, setCoin] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCoin(event.target.value as string);
  };

  return (
    <>
      <Button onClick={handleOpen}>Sell</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <SellIcon /> Set Price
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6" component="div">
            Price
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={coin}
                label="Select"
                onChange={handleChange}>
                <MenuItem value="SSF">SySF</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
