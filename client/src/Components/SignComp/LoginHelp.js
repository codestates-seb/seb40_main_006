/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Grid, Link } from '@mui/material/';
import ForgetPassword from './ForgetPassword';

const LoginHelp = () => {
  return (
    <Grid container>
      <Grid item xs>
        <ForgetPassword />
      </Grid>
      <Grid item>
        <Link href="/signup" variant="body2">
          회원가입
        </Link>
      </Grid>
    </Grid>
  );
};

export default LoginHelp;
