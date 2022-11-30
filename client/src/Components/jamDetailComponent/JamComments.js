/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import WriteComment from './WriteComment';
import ReplyComment from './ReplyComment';
import ReReplyComment from './ReReplyComment';
import { palette } from '../../Styles/theme';

const Container = css`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  padding: 20px;

  hr {
    width: 100%;
    border-style: none;
    background-color: ${palette.border};
    height: 1px;
  }
`;

const ReplyContainer = css`
  width: 100%;
`;

const JamComments = ({
  text,
  setText,
  comments,
  setComments,
  handleSubmit,
}) => {
  // const [text, setText] = useState('');
  // const [comments, setComments] = useState([]);

  // console.log('comments 확인용: ', comments);

  return (
    <div css={Container}>
      {/* 댓글 작성 부분 */}
      <div>
        <WriteComment
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
        />
      </div>
      <ThemeProvider theme={palette}>
        <hr />
      </ThemeProvider>

      {/* 댓글 렌더 부분 */}
      <div css={ReplyContainer}>
        {comments.length !== 0 &&
          comments.map((comment, idx) => {
            // console.log('comment: ', comment);
            return (
              // comment(댓글)에 responseTo가 없으면 ReplyComment 컴포넌트를 렌더
              // !comment.responseTo && (
              comment.isRoot && (
                <div key={idx}>
                  {/* 실질적으로 댓글을 렌더하는 곳 */}
                  <ReplyComment
                    key={comment.postId}
                    postId={comment.postId}
                    // contents={comment.contents}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                  />
                  {/* 재귀적으로 다른 ReplyComment를 렌더하기 위한 컴포넌트 */}
                  {/* 여기서 responseTo가 있는 대댓글을 렌더하게 됨 */}
                  <ReReplyComment
                    key={comment.contents}
                    postId={comment.postId}
                    comments={comments}
                    comment={comment}
                  />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default JamComments;
