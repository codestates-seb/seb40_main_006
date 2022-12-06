/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import { css, ThemeProvider } from '@emotion/react';
import { useRef } from 'react';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { BsPlusCircle } from 'react-icons/bs';
import DeleteIcon from '@mui/icons-material/Delete';
import { theme, palette } from '../../Styles/theme';

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

const DeleteButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Uploader = ({ image, setImage }) => {
  const fileInputRef = useRef(null);

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
            hidden
            style={{ display: 'none' }}
          />
        </div>
      </label>
      <div css={DeleteButton}>
        {image.previewURL && (
          <ThemeProvider theme={theme}>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={deleteImage}
            >
              <DeleteIcon />
            </IconButton>
          </ThemeProvider>
        )}
      </div>
    </div>
  );
};

export default Uploader;
