/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';

const colors = {
  default: '#FFCABB',
  cancel: '#DDDDDD',
  negative: '#FF8B8B',
  positive: '#FF9B51',
};

const sizeStyle = {
  sm: {
    height: '40px',
    fontSize: '14px',
    padding: '3px 15px',
  },
  md: {
    height: '45px',
    fontSize: '16px',
    padding: '5px 20px',
  },
  lg: {
    height: '50px',
    fontSize: '18px',
    padding: '7px 23px',
  },
};

const Button = ({ children, size = 'md', variant = 'default' }) => {
  return (
    <button
      type="button"
      css={{
        borderRadius: '5px',
        border: '1px solid rgba(27, 31, 36, 0.15)',
        backgroundColor: colors[variant],
        color: 'black',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        fontWeight: '600',
        lineHeight: '20px',
        ...sizeStyle[size],
        textAlign: 'center',
        cursor: 'pointer',
        appearance: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
