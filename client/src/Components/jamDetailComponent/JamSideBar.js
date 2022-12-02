/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import RecruitState from './RecruitState';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { categories } from '../jamCreateComponent/StudyInputField';
import { getCookie } from '../SignComp/Cookie';
import { loginUserInfoState } from '../../Atom/atoms';

const JamSideContainer = css`
  width: 220px;
  /* min-width: 200px; */
  display: flex;
  position: sticky;
  left: 20px;
  top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  gap: 10px;
  font-size: 12px;
  padding: 15px;
  margin-top: 30px;
`;

const Header = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 5px;
`;
const UserAndStateBox = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 0.5px;
`;

const UserBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  letter-spacing: 0.5px;
`;

const Title = css`
  font-size: 16px;
  /* margin: 5px 0; */
`;

const EtcInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 5px;
  .categoryIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    letter-spacing: 0.5px;
  }
`;

const AvatarContainer = css``;

const ButtonContainer = css`
  width: 100%;
  height: 35px;
`;

const RegisterButton = css`
  width: 100%;
  height: 100%;
  border-style: none;
  border-radius: 5px;
  font-weight: 600;
  background-color: #f33b06;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f25e36;
  }
`;

const CloseJamButton = css`
  background-color: #ff9b51;

  &:hover {
    background-color: #fd7e14;
  }
`;

const CancleButton = css`
  background-color: #bababa;
  &:hover {
    background-color: grey;
  }
`;

// eslint-disable-next-line no-unused-vars
const JamSideBar = ({
  jamData,
  isComplete,
  setIsComplete,
  joiner,
  setJoiner,
}) => {
  // const [isJoin, setIsJoin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  // const [isJoin, setIsJoin] = useState(false);
  const [currentUser] = useRecoilState(loginUserInfoState);

  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = getCookie('accessToken');

  const {
    title,
    location,
    nickname,
    currentPpl,
    capacity,
    createdAt,
    category,
    // completeStatus,
    openChatLink,
    // participantList,
  } = jamData;

  const filteredCategory = categories.filter(el => el.value === category)[0];

  // 로그인 유저가 잼에 참여한 리스트에 있는지 확인
  // 리턴값 true => 참여한 상태 => 참여취소 버튼 렌더
  // 리턴값 false => 미참여 상태 => 참여하기 버튼 렌더
  // const isJoiner = user => {
  //   // eslint-disable-next-line no-unused-expressions
  //   return (
  //     joiner && joiner.filter(el => el.nickname === user.nickname).length === 1
  //   );
  // };

  const isJoiner =
    joiner &&
    joiner.filter(el => el.nickname === currentUser.nickname).length === 1;

  const handleClose = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmData = confirm('모집을 완료하시겠습니까?');

    if (!accessToken) {
      alert('토큰이 만료되었습니다');
      navigate('/login');
      window.location.reload();
    }

    if (confirmData && accessToken) {
      if (accessToken) {
        await axios
          .post(
            `/jams/${id}/complete/true`,
            {},
            {
              headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          .then(res => {
            console.log('res.status: ', res.status);
            if (res.status === 200) {
              setIsComplete('TRUE');
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  };

  const handleCancelClose = async () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const confirmData = confirm('모집완료를 취소하시겠습니까?');

    if (!accessToken) {
      alert('토큰이 만료되었습니다');
      navigate('/login');
      window.location.reload();
    }

    if (confirmData && accessToken) {
      await axios
        .delete(`/jams/${id}/complete/false`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          console.log('res.status: ', res.status);
          if (res.status === 200) {
            setIsComplete('FALSE');
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  const handleJoin = async () => {
    // eslint-disable-next-line no-restricted-globals

    if (!accessToken) {
      alert('토큰이 만료되었습니다');
      navigate('/login');
      window.location.reload();
    }

    await axios
      .post(
        `/jams/${id}/participation/true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        console.log('res.status: ', res.status);
        if (res.status === 200) {
          setJoiner([...joiner, currentUser]);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const handleWithdraw = async () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const confirmData = confirm('참여를 취소하시겠습니까?');

    if (!accessToken) {
      alert('토큰이 만료되었습니다');
      navigate('/login');
      window.location.reload();
    }

    if (confirmData && accessToken) {
      await axios
        .delete(`/jams/${id}/participation/false`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          console.log('res.status: ', res.status);
          if (res.status === 200) {
            // setJoiner(false);
            setJoiner(
              joiner.filter(el => el.nickname !== currentUser.nickname),
            );
          }
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  console.log(jamData);
  // console.log('completeStatus: ', completeStatus);
  // console.log('isJoin: ', isJoin);
  // console.log('isJoiner(currentUser): ', isJoiner(currentUser));
  // console.log('isComplete: ', isComplete);
  console.log('currentUser: ', currentUser);
  // console.log('participantList: ', jamData.participantList);
  // console.log('currentUser.nickname: ', currentUser.nickname);
  // console.log('isJoiner: ', isJoiner(currentUser)); // 문제 지점
  // console.log('isJoiner(currentUser): ', isJoiner(currentUser));
  console.log('isJoiner: ', isJoiner);
  console.log('joiner: ', joiner);
  // console.log('확인: ', isJoiner !== currentUser.nickname);
  // console.log(
  //   '확인',
  //   jamData.participantList &&
  //     participantList.filter(el => el.nickname === currentUser.nickname)[0]
  //       .nickname,
  // );

  return (
    <div css={JamSideContainer}>
      <div css={Header}>
        <div css={UserAndStateBox}>
          <div css={UserBox}>
            <FaUserCircle />
            <span>{nickname}</span>
          </div>
          {isComplete === 'FALSE' ? (
            <RecruitState state="open" variant="colorJamOpen">
              모집중
            </RecruitState>
          ) : (
            <RecruitState state="close" variant="colorJamClose">
              모집완료
            </RecruitState>
          )}
        </div>
      </div>
      <h6 css={Title}>{title}</h6>
      <div css={EtcInfo}>
        <div className="categoryIcons">
          <BiCategory />
          {filteredCategory && <span>{filteredCategory.label}</span>}
        </div>
        <div className="categoryIcons">
          <BsClockFill />
          <span>{jamElapsedTime(createdAt)}</span>
        </div>
        <div className="categoryIcons">
          <BsPeopleFill />
          <span>
            {currentPpl}/{capacity}명
          </span>
        </div>
        <div className="categoryIcons">
          <ImLocation />
          <span>{location}</span>
        </div>
      </div>
      {/* 참여했거나 스터디 개설자와 로그인유저가 같으면 렌더  */}
      {/* {(isJoiner(currentUser) || nickname === currentUser.nickname) && ( */}
      {(isJoiner || nickname === currentUser.nickname) && (
        <>
          <div css={AvatarContainer}>
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
            <FaUserCircle size={25} />
          </div>
          <div>
            <span>채팅채널</span>
            <br />
            <span>
              <Link to={openChatLink} target="_blank">
                {openChatLink}
              </Link>
            </span>
          </div>
        </>
      )}
      {/* 스터디 개설 유저가 로그인 유저와 같지 않으면 참여 부분, 같으면 모집 부분 렌더 */}
      {nickname !== currentUser.nickname ? (
        <div css={ButtonContainer}>
          {/* { 로그인 유저가 participantList에 있는지로 수정 예정 ( */}
          {/* {isJoiner(currentUser)} */}
          {/* {isJoiner(currentUser) !== currentUser.nickname ? ( */}
          {/* {!isJoiner(currentUser) ? ( */}
          {!isJoiner ? (
            <button type="button" css={RegisterButton} onClick={handleJoin}>
              참여하기
            </button>
          ) : (
            <button
              type="button"
              css={[RegisterButton, CancleButton]}
              onClick={handleWithdraw}
            >
              참여취소하기
            </button>
          )}
        </div>
      ) : (
        <div css={ButtonContainer}>
          {isComplete === 'FALSE' ? (
            <button
              type="button"
              css={[RegisterButton, CloseJamButton]}
              onClick={handleClose}
            >
              모집 완료하기
            </button>
          ) : (
            <button
              type="button"
              css={[RegisterButton, CloseJamButton, CancleButton]}
              onClick={handleCancelClose}
            >
              모집완료 취소
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JamSideBar;
