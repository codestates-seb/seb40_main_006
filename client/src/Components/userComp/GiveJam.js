import React, { useState } from 'react';
import { css } from '@emotion/css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { myPageInfoState } from '../../Atom/atoms';
import { palette } from '../../Styles/theme';
import { getCookie } from '../SignComp/Cookie';

const jamTitle = css`
  display: flex;
  justify-content: center;
  > div {
    font-size: 24px;
    font-weight: 700;
    color: ${palette.colorBtn1};
    margin-top: 10px;
  }
`;

const jamContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const selectJam = css`
  filter: invert(15%) sepia(25%) saturate(5606%) hue-rotate(322deg)
    brightness(102%) contrast(102%);
`;

const jamImage = css`
  display: flex;
  justify-content: center;
  cursor: pointer;
  > img {
    width: 70px;
  }
`;

const jamBtn = css`
  background: ${palette.colorBtn1};
  min-width: 100px;
  min-height: 30px;
  border-radius: 10px;
  color: ${palette.white};
  :hover {
    background: ${palette.colorGrade3};
  }
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ mt: 2, p: 3 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function GiveJam() {
  const [open, setOpen] = React.useState(false);
  const [pageUser] = useRecoilState(myPageInfoState);
  const array = [0, 1, 2, 3, 4];
  const [jam, setJam] = useState([false, false, false, false, false]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const jamClickHandler = idx => {
    let copy = [...jam];
    copy = copy.map((el, i) => i <= idx);
    setJam(copy);
  };

  const jamGradeSubmitHandler = () => {
    const grade = jam.filter(el => el).length;
    const accessToken = getCookie('is_login');
    console.log(grade);
    axios
      .post(
        `${process.env.REACT_APP_URL}/user/profile/${pageUser.memberId}/grade`,
        { grade },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => console.log(res));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        잼 주기
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose} className={jamTitle}>
          <div>{pageUser.nickname}님에게 잼을 주세요!</div>
        </BootstrapDialogTitle>
        <DialogContent sx={{ mt: 2, mb: 3 }} className={jamContent}>
          <Typography className={jamImage}>
            {array.map((el, idx) => (
              <img
                src="../img/whiteJam.png"
                alt="jam"
                role="presentation"
                className={jam[idx] ? selectJam : ''}
                key={el}
                onClick={() => jamClickHandler(idx)}
              />
            ))}
          </Typography>
          <form onSubmit={jamGradeSubmitHandler}>
            <button className={jamBtn} type="submit">
              전달
            </button>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
