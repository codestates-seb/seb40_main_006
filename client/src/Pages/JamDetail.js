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
// import ReplyComment from '../Components/jamDetailComponent/ReplyComment';
// import ReReplyComment from '../Components/jamDetailComponent/ReReplyComment';

const MergeContainer = css`
  width: 100%;
  display: flex;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const JamContainer = css`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2); */
  /* border: 2px solid ${palette.gray_5}; */
  border-radius: 3px;
`;

const MainCommentContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  span {
    font-size: 20px;
    margin-bottom: 10px;
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
  /* box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2); */
  border-radius: 3px;
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const JamDetail = ({ isEdit, setIsEdit }) => {
  const [host, setHost] = useState('김코딩'); // eslint-disable-line no-unused-vars
  const [loginUser, setLoginUser] = useState('김코딩'); // eslint-disable-line no-unused-vars

  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const nextId = useRef(0);

  const [jamData, setJamData] = useState([]);
  const [isComplete, setIsComplete] = useState('');
  const [joiner, setJoiner] = useState([]);

  const { id } = useParams();

  // eslint-disable-next-line no-shadow
  const getJamData = async () => {
    // eslint-disable-next-line no-return-await
    await axios
      .get(`${BASE_URL}/jams/${id}`)
      .then(res => {
        setJamData({ ...res.data });
        setIsComplete({ ...res.data }.completeStatus);
        setJoiner({ ...res.data }.participantList);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getJamData();
  }, []);

  // .log('jamData: ', jamData);

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
      .then(window.location.reload());

    const body = {
      postId: nextId.current,
      contents: text,
      // writer_id: userData._id,
      // writer_nickname: userData.nickname,
      // writer_image: userData.userImage,
      // responseTo: comments,
      // responseTo: 'root',
      isRoot: true,
      isEdit: false,
    };

    const addComments = () => {
      // setComments([...comments, body]);
      setComments(comments.concat(body));
      nextId.current += 1;
    };

    // eslint-disable-next-line no-unused-expressions
    text && addComments(text);
    setText('');
  };

  // useEffect(() => {
  //   setComments(comments.filter(comment => !comment.responseTo));
  // }, [comments]);

  console.log('joiner: ', joiner);

  return (
    <div css={MergeContainer}>
      <Sidebar />
      <main css={Container}>
        <div css={SectionContainer}>
          <ThemeProvider theme={palette}>
            <div css={JamContainer}>
              <JamInfo
                host={host}
                loginUser={loginUser}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                jamData={jamData}
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
              {/* 댓글 */}
              <Reply replyList={jamData.commentList} jamData={jamData} />
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
