/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import MapLanding from './MapLanding';
import { theme } from '../../Styles/theme';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    mobile: 'none',
    tablet: 850,
    laptop: 850,
  },
  // border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  color: '#fff',
};

const KewordAddressModal = ({
  open,
  handleClose,
  setLocationText,
  setLatitude,
  setLongitude,
  setAddress,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <ThemeProvider theme={theme}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              스터디할 장소를 키워드로 입력해보세요
            </Typography>
            <MapLanding
              setLocationText={setLocationText}
              handleClose={handleClose}
              setLongitude={setLongitude}
              setLatitude={setLatitude}
              setAddress={setAddress}
            />
          </Box>
        </ThemeProvider>
      </Modal>
    </div>
  );
};

export default KewordAddressModal;
