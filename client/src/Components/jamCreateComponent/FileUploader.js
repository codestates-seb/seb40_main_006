/** @jsxImportSource @emotion/react */
import React from 'react';
// import { css } from '@emotion/react';
import { Uploader } from 'rsuite';
import { BsPlusCircle } from 'react-icons/bs';

// 왜 인라인 스타일로 주면 적용되고 이렇게 주면 안될까..?
// const UploadContainer = css`
//   width: 100%;
//   height: 300px;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   border-radius: 5px;
// `;

const FileUploader = () => {
  return (
    <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
      <div
        style={{
          height: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          color: 'grey',
        }}
      >
        <BsPlusCircle size={40} />
        <span>스터디를 표현할 이미지를 추가해주세요</span>
      </div>
    </Uploader>
  );
};

export default FileUploader;
