import React from 'react';
import { Grid, Link } from '@mui/material/';

const LoginHelp = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link href="/" variant="body2">
          비밀번호를 잊으셨나요?
        </Link>
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
