/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import palette from '../../Styles/theme';

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

const EditButtonGroup = ({ isCreated, setIsCreated }) => {
  return (
    <div css={ButtonContainer}>
      <ThemeProvider theme={palette}>
        <button
          css={CancleEdit}
          type="submit"
          form="test"
          onClick={() => setIsCreated(!isCreated)}
        >
          수정취소
        </button>
        <button css={[CancleEdit, FinishEdit]} type="submit" form="test">
          수정완료
        </button>
        <button css={[CancleEdit, DeleteEdit]} type="submit" form="test">
          삭제하기
        </button>
      </ThemeProvider>
    </div>
  );
};

export default EditButtonGroup;
