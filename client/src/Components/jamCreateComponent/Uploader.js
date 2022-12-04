/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { BsPlusCircle } from 'react-icons/bs';
import { palette } from '../../Styles/theme';

const Container = css`
  width: 100%;
  height: 100%;
`;

const UploaderWrapper = css`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px dashed ${palette.border};
  border-radius: 3px;
  margin-bottom: 7px;

  .img-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;
    font-size: 17px;
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ImgBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const UploadButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Uploader = ({ image, setImage }) => {
  const fileInputRef = useRef(null);

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const saveImage = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    // eslint-disable-next-line no-undef
    await axios
      .post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setImage({ previewURL: res.data });
      })
      .catch(err => {
        console.log(err.Error);
      });
  };

  const deleteImage = () => {
    setImage({
      image_file: '',
      previewURL: null,
    });
  };

  return (
    <div css={Container}>
      <label htmlFor="inputFile">
        <div css={UploaderWrapper}>
          <div className="img-wrapper">
            {!image.previewURL ? (
              <div css={ImgBox}>
                <BsPlusCircle size={45} />
                <span>스터디를 표현할 이미지를 추가해주세요</span>
              </div>
            ) : (
              <img src={image.previewURL} alt="studyimage" />
            )}
          </div>
          <input
            id="inputFile"
            type="file"
            accept="image/*"
            onChange={saveImage}
            ref={fileInputRef}
            onClick={handleClickFileInput}
            hidden
            style={{ display: 'none' }}
          />
        </div>
      </label>
      <div css={UploadButton}>
        <Button
          type="primary"
          variant="contained"
          onClick={handleClickFileInput}
        >
          미리보기
        </Button>
        <Button color="error" variant="contained" onClick={deleteImage}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default Uploader;
