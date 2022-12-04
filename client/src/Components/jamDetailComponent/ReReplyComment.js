/* eslint-disable array-callback-return */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import ReplyComment from './ReplyComment';

const TestViewReply = css`
  width: 100%;
  height: fit-content;
`;

const displayReply = css`
  width: 100%;
  padding-left: 20px;
  button {
    margin: 10px 0;
  }
`;

const ReReplyComment = ({ postId, comments, setComments }) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0); // 대댓글의 개수
  const [openReply, setOpenReply] = useState(false);

  const ViewReplyHandler = () => {
    setOpenReply(!openReply);
  };

  useEffect(() => {
    let commentNumber = 0;
    // eslint-disable-next-line array-callback-return, no-unused-expressions
    comments.length !== 0 &&
      comments.map(el => {
        if (!el.isRoot && el.postId === postId) {
          // eslint-disable-next-line no-plusplus
          commentNumber++;
        }
      });
    setChildCommentNumber(commentNumber);
  }, [comments]);

  const RenderReply = parentId =>
    // eslint-disable-next-line no-shadow
    comments.map((comment, idx) => (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <div key={idx}>
        {!comment.isRoot && comment.postId === parentId && (
          <div
            className="test"
            style={{
              width: '90%',
              marginLeft: '40px',
              marginBottom: '5px',
              marginTop: '5px',
            }}
          >
            <ReplyComment
              key={comment.postId}
              postId={postId}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div css={TestViewReply}>
      <div css={displayReply}>
        {childCommentNumber > 0 && (
          <>
            <button type="button" onClick={ViewReplyHandler}>
              {openReply ? '▼' : '▶'}
              {childCommentNumber}개의 댓글
            </button>
            <div>{openReply && RenderReply(postId)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReReplyComment;
