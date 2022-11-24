/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddressModal = ({ open, handleClose, setOpen, address, setAddress }) => {
  // const [address, setAddress] = useState(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [isOpenSecondPopup, setIsOpenSecondPopup] = useState(false);

  // const openModal = useCallback(() => {
  //   setOpen(true);
  // }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const onChange = useCallback(e => {
    setDetailAddress(e.target.value);
  }, []);

  const handleComplete = useCallback(data => {
    let fullAddress = data.address;
    let extraAddress = '';
    // let zoneCodes = data.zonecode;
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // fullAddress -> 전체 주소반환
    // console.log(fullAddress);
    setAddress(fullAddress);
    setIsOpenSecondPopup(true);
  }, []);

  const onClick = useCallback(
    e => {
      e.preventDefault();
      console.log(address + detailAddress);
      setAddress(address + detailAddress);
      setIsOpenSecondPopup(false);
      closeModal(false);
    },
    [closeModal, address, detailAddress, setAddress],
  );

  console.log(detailAddress);

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
            주소를 입력해주세요
          </Typography>
          <DaumPostcode onComplete={handleComplete} />
          {isOpenSecondPopup && (
            <div>
              <h3>상세 주소 입력</h3>
              <input
                placeholder="상세 주소를 입력해 주세요"
                onChange={onChange}
                value={detailAddress}
              />
              <button type="button" onClick={onClick}>
                저장
              </button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AddressModal;
