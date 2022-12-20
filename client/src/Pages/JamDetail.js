/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import JamInfo from '../Components/jamDetailComponent/JamInfo';
import JamComments from '../Components/jamDetailComponent/JamComments';
import JamSideBar from '../Components/jamDetailComponent/JamSideBar';
// import Button from '../components/Button';
import Sidebar from '../Components/Sidebar';
import { palette } from '../Styles/theme';
import { getCookie } from '../Components/SignComp/Cookie';
import Reply from '../Components/jamDetailComponent/Reply';
import ScrollToTop from '../ScrollToTop';

const MergeContainer = css`
  width: 100%;
  display: flex;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 479px) {
    justify-content: center;
    align-items: center;
  }
`;

const sidebarContainer = css`
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 20px;
`;

const SectionContainer = css`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 0 10px;
    width: 100%;
  }
  @media screen and (max-width: 479px) {
    width: 100%;
  }
`;

const JamContainer = css`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 3px;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0;
    margin: 0 10px;
  }
  @media screen and (max-width: 479px) {
    width: 100%;
  }
`;

const MainCommentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  span {
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 20px 0;
  }
  @media screen and (max-width: 479px) {
    width: 100%;
  }
`;

const CommentContainer = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${palette.gray_4};
  border-radius: 3px;
  @media screen and (max-width: 479px) {
    width: 100%;
  }
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const JamDetail = ({ setIsEdit }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const nextId = useRef(0);
  const [jamData, setJamData] = useState([]);
  const [isComplete, setIsComplete] = useState('');
  const [joiner, setJoiner] = useState([]);
  const { id } = useParams();

  const [replyData, setReplyData] = useState([]);

  ScrollToTop();

  // eslint-disable-next-line no-shadow
  const getJamData = async () => {
    // eslint-disable-next-line no-return-await
    await axios.get(`${BASE_URL}/jams/${id}`).then(res => {
      setJamData({ ...res.data });
      setIsComplete({ ...res.data }.completeStatus);
      setJoiner({ ...res.data }.participantList);
    });
  };

  useEffect(() => {
    getJamData();
  }, [replyData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alert('댓글 내용을 입력해주세요');
      return;
    }
    axios
      .post(
        `${BASE_URL}/jams/${jamData.jamId}/comments`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        },
      )
      .then(res => {
        const copy = [...replyData];
        copy.push(res.data);
        setReplyData(copy);
      });

    const body = {
      postId: nextId.current,
      contents: text,
      isRoot: true,
      isEdit: false,
    };

    const addComments = () => {
      setComments(comments.concat(body));
      nextId.current += 1;
    };

    // eslint-disable-next-line no-unused-expressions
    text && addComments(text);
    setText('');
  };

  return (
    <div css={MergeContainer}>
      <div css={sidebarContainer}>
        <Sidebar />
      </div>
      <main css={Container}>
        <div css={SectionContainer}>
          <ThemeProvider theme={palette}>
            <div css={JamContainer}>
              <JamInfo
                setIsEdit={setIsEdit}
                jamData={jamData}
                isComplete={isComplete}
                setIsComplete={setIsComplete}
                joiner={joiner}
                setJoiner={setJoiner}
              />
            </div>
          </ThemeProvider>
          <div css={MainCommentContainer}>
            <span>댓글</span>
            <div css={CommentContainer}>
              <JamComments
                text={text}
                setText={setText}
                comments={comments}
                setComments={setComments}
                handleSubmit={handleSubmit}
                jamData={jamData}
              />
              <Reply
                replyList={jamData.commentList}
                jamData={jamData}
                replyData={replyData}
                setReplyData={setReplyData}
              />
            </div>
          </div>
        </div>
        <JamSideBar
          jamData={jamData}
          isComplete={isComplete}
          setIsComplete={setIsComplete}
          joiner={joiner}
          setJoiner={setJoiner}
        />
      </main>
    </div>
  );
};

export default JamDetail;
