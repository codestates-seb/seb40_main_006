/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { palette } from '../../Styles/theme';
import { getCookie } from '../SignComp/Cookie';

const ButtonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const CancleEdit = css`
  border-radius: 5px;
  border: none;
  background-color: ${palette.colorBtn3};
  color: black;
  font-weight: 500;
  line-height: 20px;
  height: 40px;
  font-size: 14px;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
`;

const FinishEdit = css`
  background-color: ${palette.colorJamOpen};
`;

const DeleteEdit = css`
  background-color: ${palette.colorBtn2};
`;

const EditButtonGroup = ({ patchData }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = getCookie('accessToken');

  const handleEdit = async e => {
    e.preventDefault();

    if (!accessToken) {
      alert('토큰이 만료 되었습니다');
      navigate('/login');
      window.location.reload();
    }

    await axios
      .patch(`/jams/${id}`, patchData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        // console.log('res.data: ', res.data);
        alert('수정이 완료되었습니다.');
        navigate(`/jamdetail/${id}`);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // eslint-disable-next-line no-shadow
  const handleRemove = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmData = confirm('정말로 삭제하시겠습니까?');

    if (confirmData && accessToken) {
      try {
        await axios.delete(`/jams/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        navigate(`/category`);
      } catch (e) {
        alert('잘못된 요청입니다. 로그인을 다시 해주세요');
        console.log(e);
      }
    }

    // if (confirmData && accessToken) {
    //   await axios
    //     .delete(`/jams/${id}`, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     })
    //     .then(res => {
    //       console.log('res.data: ', res.data);
    //       window.location.reload();
    //     });
    // }
  };

  console.log('patchData: ', patchData);

  return (
    <div css={ButtonContainer}>
      <ThemeProvider theme={palette}>
        <button css={CancleEdit} type="submit" onClick={() => navigate(-1)}>
          수정취소
        </button>
        <button
          css={[CancleEdit, FinishEdit]}
          type="button"
          form="makeStudy"
          onClick={handleEdit}
        >
          수정완료
        </button>
        <button
          css={[CancleEdit, DeleteEdit]}
          type="button"
          onClick={handleRemove}
        >
          삭제하기
        </button>
      </ThemeProvider>
    </div>
  );
};

export default EditButtonGroup;
