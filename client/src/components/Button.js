/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';

const colors = {
  default: '#FFCABB',
  cancel: '#DDDDDD',
  negative: '#FF8B8B',
  positive: '#FF9B51',
  accent: '#F33B06',
};

const sizeStyle = {
  xs: {
    height: '30px',
    fontSize: '12px',
    padding: '3px 15px',
  },

  sm: {
    height: '35px',
    fontSize: '14px',
    padding: '3px 15px',
  },
  md: {
    height: '40px',
    fontSize: '14px',
    padding: '5px 20px',
  },
  lg: {
    height: '50px',
    fontSize: '18px',
    padding: '7px 23px',
  },
  long: {
    width: '100%',
    height: '35px',
    fontSize: '14px',
    padding: '5px 20px',
    color: '#fff',
    fontWeight: '600',
  },
};

const Button = ({ children, size = 'md', variant = 'default' }) => {
  return (
    <button
      type="button"
      css={{
        borderRadius: '5px',
        // border: '1px solid rgba(27, 31, 36, 0.15)',
        border: 'none',
        backgroundColor: colors[variant],
        color: 'black',
        fontWeight: '500',
        lineHeight: '20px',
        ...sizeStyle[size],
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
