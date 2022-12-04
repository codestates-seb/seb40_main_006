/** @jsxImportSource @emotion/react */
import React from 'react';
import { Uploader } from 'rsuite';
import { BsPlusCircle } from 'react-icons/bs';

const FileUploader = () => {
  return (
    <Uploader
      action="//jsonplaceholder.typicode.com/posts/"
      accept="image/*"
      draggable
    >
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
