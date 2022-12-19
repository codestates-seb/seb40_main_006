import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { css } from '@emotion/css';
import { Avatar } from '@mui/material/';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { isLoginState, loginUserInfoState } from '../../Atom/atoms';
import UserLogout from '../userComp/Logout';

const drawerContainer = css`
  width: 250px;
`;

const userContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;

  p {
    font-weight: bold;
    margin: 10px;
  }
`;
const avataBtn = css`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 10px;
`;

const MenuDrawer = () => {
  const [user] = useRecoilState(loginUserInfoState);
  const [isLogin] = useRecoilState(isLoginState);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const MoveTo = path => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div>
      <MdMenu aria-label="open drawer" onClick={() => setIsOpen(true)} />
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => {}}
      >
        <div className={drawerContainer}>
          <div className={userContainer}>
            <div className={avataBtn}>
              {isLogin ? (
                <img src={user.img} alt="userimg" />
              ) : (
                <Avatar sx={{ width: 70, height: 70 }} />
              )}
            </div>
            {isLogin ? <p>{user.nickname}님</p> : <p>로그인을 진행해주세요</p>}
          </div>
          <Divider />
          {isLogin ? (
            <List>
              <ListItem button>
                <ListItemText
                  primary="마이페이지"
                  onClick={() => MoveTo(`mypage/${user.memberId}`)}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="프로필 수정"
                  onClick={() => MoveTo(`profile/${user.memberId}`)}
                />
              </ListItem>
              <ListItem button>
                <ListItemText primary="로그아웃">
                  <UserLogout />
                </ListItemText>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button>
                <ListItemText
                  primary="로그인"
                  onClick={() => MoveTo('login')}
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="회원가입"
                  onClick={() => MoveTo('signup')}
                />
              </ListItem>
            </List>
          )}
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="잼잇 소개" onClick={() => MoveTo('/')} />
            </ListItem>
            <ListItem button>
              <ListItemText primary="문의" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
};
export default MenuDrawer;
