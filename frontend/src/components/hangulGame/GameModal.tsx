import React from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { selectTabButtonStyle } from '../../_css/ReactCSSProperties';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const styleInner = {
  py: 1,
};

const QBtn = {
  borderRadius: 100,
  background: '#b9b9b9',
};

export default function GameModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} sx={QBtn}>
        <QuestionMarkIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Welcome to Hangul Game
          </Typography>
          <br />
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="div" sx={styleInner}>
              1. A random Korean word is played
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="div" sx={styleInner}>
              2. You will be given 4 Hangul options
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="div" sx={styleInner}>
              3. Choose the option that matches what you hear!
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="div" sx={styleInner}>
              4. If you pick the correct one, you can get a ticket!
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="div" sx={styleInner}>
              5. It consists of 5 consecutive questions.
            </Typography>
          </Box>
          <Button variant="contained" onClick={handleClose} style={{...selectTabButtonStyle}}>
            Let&apos;s Play
          </Button>
        </Box>
      </Modal>
    </>
  );
}
