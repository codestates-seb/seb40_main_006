/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { ThemeProvider } from '@mui/material';
import jamElapsedTime from '../userComp/JamElapsedTime';
// import WriteComment from './WriteComment';
import { palette } from '../../Styles/theme';

const Container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const UserBox = css`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 3px;
  margin-bottom: 5px;
`;

const Time = css`
  margin-left: auto;
`;

const JamIcon = css`
  color: ${palette.colorGrade5};
`;

const UserName = css`
  font-size: 13px;
`;

const WrittenComment = css`
  width: 100%;
  height: fit-content;
  padding: 10px;
  border-radius: 3px;
  background-color: #fff;
`;

const WriteReplyContainer = css`
  /* padding-left: 20px; */
`;

const TextInputStyle = css`
  padding-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  textarea {
    width: 100%;
    height: 40px;
    padding: 5px;
    margin-bottom: 5px;
  }
  button {
    text-align: right;
  }
`;

const replyHandler = css`
  margin: 5px 0 10px 0;
`;

const ReplyComment = ({ postId, comment, comments, setComments }) => {
  const [showReplyInput, setshowReplyInput] = useState(false);
  const [text, setText] = useState('');

  const replyId = useRef(0);

  const replyInputHandler = () => {
    setshowReplyInput(!showReplyInput);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text === '') {
      alert('댓글 내용을 입력해주세요');
    }

    const body = {
      postId,
      // commentId: postId,
      contents: text,
      // writer_id: userData._id,
      // writer_nickname: userData.nickname,
      // writer_image: userData.userImage,
      responseTo: replyId.current,
      isEdit: false,
      isRoot: false,
    };

    const addComments = () => {
      // setComments([...comments, body]);
      setComments(comments.concat(body));
      replyId.current += 1;
      setshowReplyInput(false);
    };

    // eslint-disable-next-line no-unused-expressions
    text && addComments(text);
    setText('');
  };

  // console.log('comment: ', comment);

  return (
    <>
      <div css={Container} key={comment.postId}>
        <div css={UserBox}>
          <div>
            <FaUserCircle size={15} />
          </div>
          <div css={UserName}>{comments.nickname}</div>
          <ThemeProvider theme={palette}>
            <div css={JamIcon}>
              <AiOutlineTwitter size={16} />
            </div>
          </ThemeProvider>
          <p css={Time}>{jamElapsedTime(comments.createdAt)}</p>
        </div>
        <div css={WrittenComment}>{comments.content}</div>
      </div>
      <div css={WriteReplyContainer}>
        {comment.isRoot && (
          <button css={replyHandler} type="button" onClick={replyInputHandler}>
            댓글작성(누르면 작성창 열림)
          </button>
        )}
        {/* <div>{showReplyInput && <WriteComment />}</div> */}
        <form css={TextInputStyle}>
          {showReplyInput && (
            <>
              <textarea
                onChange={handleTextChange}
                placeholder="댓글을 작성해주세요"
              />
              <button type="button" className="submit" onClick={handleSubmit}>
                댓글달기
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ReplyComment;
