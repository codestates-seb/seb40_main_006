/* eslint-disable no-unused-vars */
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
  jamData,
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
      <div css={ReplyContainer}>
        {comments.length !== 0 &&
          comments.map((comment, idx) => {
            return (
              comment.isRoot && (
                <div key={idx}>
                  {/* <ReplyComment
                    key={comment.postId}
                    postId={comment.postId}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                  /> */}
                  {/* <ReReplyComment
                    key={comment.contents}
                    postId={comment.postId}
                    comments={comments}
                    comment={comment}
                  /> */}

                  {/* {jamData.commentList &&
                    jamData.commentList.map(el => (
                      <div key={el.commentId}>
                        {console.log('zzz: ', el)};
                        <ReplyComment
                          key={el.commentId}
                          postId={el.commentId}
                          comment={el.content}
                          comments={el}
                          setComments={setComments}
                          handleSubmit={handleSubmit}
                        />
                        <ReReplyComment
                          key={comment.contents}
                          postId={comment.postId}
                          comments={comments}
                          comment={comment}
                        /> */}
                  {/* </div> */}
                  {/* ))} */}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default JamComments;
