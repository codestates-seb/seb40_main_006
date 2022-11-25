/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';

const RecruitStateStyle = {
  open: '#B0D0FF',
  close: '#BABABA',
  realtime: '#FFB0B0',
};

const RecruitState = ({ children, state = 'open' }) => {
  return (
    <div
      css={{
        borderRadius: '50px',
        backgroundColor: RecruitStateStyle[state],
        color: 'black',
        height: '25px',
        fontWeight: '600',
        lineHeight: '19px',
        fontSize: '12px',
        textAlign: 'center',
        padding: '3px 12px',
      }}
    >
      {children}
    </div>
  );
};

export default RecruitState;
