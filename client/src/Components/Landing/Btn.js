import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { palette } from '../../Styles/theme';

const ButtonRoot = styled(MuiButton)(({ theme, size }) => ({
  borderRadius: 5,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(10),
  backgroundColor: palette.colorGrade4,
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  ...(size === 'small' && {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
  }),
  ...(size === 'large' && {
    padding: theme.spacing(2, 4),
    fontSize: theme.typography.pxToRem(16),
  }),
}));

function Btn(props) {
  return <ButtonRoot {...props} />;
}

export default Btn;
