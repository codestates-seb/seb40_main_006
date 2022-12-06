/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import RecruitState from './RecruitState';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { categories } from '../jamCreateComponent/StudyInputField';
import { getCookie } from '../SignComp/Cookie';
import { loginUserInfoState } from '../../Atom/atoms';
import UserName from '../userComp/UserName';

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

const AvatarContainer = css`
  width: 100%;
  height: fit-content;
  display: flex;
  img {
    width: 30px;
    height: 30px;
    border-radius: 100px;
    cursor: pointer;
  }
`;

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

const BASE_URL = `${process.env.REACT_APP_URL}`;

// eslint-disable-next-line no-unused-vars
const JamSideBar = ({
  jamData,
  isComplete,
  setIsComplete,
  joiner,
  setJoiner,
}) => {
  const [currentUser] = useRecoilState(loginUserInfoState);

  const navigate = useNavigate();
  const { id } = useParams();

  const accessToken = getCookie('accessToken');

  // const {
  //   title,
  //   location,
  //   nickname,
  //   currentPpl,
  //   capacity,
  //   createdAt,
  //   category,
  //   openChatLink,
  // } = jamData;

  const filteredCategory = categories.filter(
    el => el.value === jamData.category,
  )[0];

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
            `${BASE_URL}/jams/${id}/complete/true`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
          .then(res => {
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
        .delete(`${BASE_URL}/jams/${id}/complete/false`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
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
        `${BASE_URL}/jams/${id}/participation/true`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        if (res.status === 200) {
          setJoiner([...joiner, currentUser]);
        }
        window.location.reload();
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
        .delete(`${BASE_URL}/jams/${id}/participation/false`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          window.location.reload();
          if (res.status === 200) {
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

  const handleCardClick = memeberId => {
    navigate(`/mypage/${memeberId}`);
  };

  const [jamOpener, setJamOpener] = useState({
    memberId: '',
    name: '',
    img: '',
  });

  useEffect(() => {
    if (jamData.participantList) {
      setJamOpener({
        memberId: jamData.participantList[0].memberId,
        name: jamData.participantList[0].nickname,
        img: jamData.participantList[0].profileImage,
      });
    }
  }, [jamData.participantList]);

  return (
    <div css={JamSideContainer}>
      <div css={Header}>
        <div css={UserAndStateBox}>
          <div css={UserBox}>
            <UserName
              name={jamOpener.name}
              id={jamOpener.memberId}
              img={jamOpener.img}
            />
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
      <h6 css={Title}>{jamData.title}</h6>
      <div css={EtcInfo}>
        <div className="categoryIcons">
          <BiCategory />
          {filteredCategory && <span>{filteredCategory.label}</span>}
        </div>
        <div className="categoryIcons">
          <BsClockFill />
          <span>{jamElapsedTime(jamData.createdAt)}</span>
        </div>
        <div className="categoryIcons">
          <BsPeopleFill />
          <span>
            {jamData.currentPpl}/{jamData.capacity}명
          </span>
        </div>
        <div className="categoryIcons">
          <ImLocation />
          <span>{jamData.location}</span>
        </div>
      </div>
      {(isJoiner || jamData.nickname === currentUser.nickname) && (
        <>
          <div css={AvatarContainer}>
            {jamData &&
              jamData.participantList.map(el => {
                return (
                  <div
                    key={el.memberId}
                    className="imgContainer"
                    onClick={() => handleCardClick(el.memberId)}
                  >
                    {el.profileImage ? (
                      <img src={el.profileImage} alt={el.nickname} />
                    ) : (
                      <FaUserCircle size={32} />
                    )}
                  </div>
                );
              })}
          </div>
          <div>
            <span>채팅채널</span>
            <br />
            <span>
              <a
                href={jamData.openChatLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {jamData.openChatLink}
              </a>
            </span>
          </div>
        </>
      )}
      {/* 스터디 개설 유저가 로그인 유저와 같지 않으면 참여 부분, 같으면 모집 부분 렌더 */}
      {jamData.nickname !== currentUser.nickname ? (
        <div css={ButtonContainer}>
          {!isJoiner ? (
            <button
              type="button"
              css={RegisterButton}
              onClick={handleJoin}
              disabled={isComplete === 'TRUE'}
              style={
                isComplete === 'TRUE' ? { backgroundColor: '#bababa' } : null
              }
            >
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
