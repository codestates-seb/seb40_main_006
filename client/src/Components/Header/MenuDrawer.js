import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { css } from '@emotion/css';
import { Avatar } from '@mui/material/';
import { useNavigate } from 'react-router-dom';

const drawerContainer = css`
  width: 250px;
`;
const avataBtn = css`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MenuDrawer = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  // isLogin 필요

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
          <Box textAlign="center" p={2}>
            <div className={avataBtn}>
              <Avatar sx={{ width: 70, height: 70 }} />
            </div>
            유저이름님
          </Box>
          <Divider />
          {/* //TODO: 로그인 여부에 따라 아래 두가지 리스트 중 하나만 보이도록 하기 */}
          <List>
            <ListItem button>
              <ListItemText primary="마이페이지" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="프로필 수정" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="로그아웃" />
            </ListItem>
          </List>
          <List>
            <ListItem button>
              <ListItemText primary="로그인" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="회원가입" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="동네 선택" />
            </ListItem>
          </List>
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
