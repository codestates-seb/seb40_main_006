/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import MapLanding from './MapLanding';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
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
  // setOpen,
}) => {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
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
      </Modal>
    </div>
  );
};

export default KewordAddressModal;
