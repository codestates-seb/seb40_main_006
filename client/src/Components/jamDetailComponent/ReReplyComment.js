/* eslint-disable array-callback-return */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
// import { FaUserCircle } from 'react-icons/fa';
// import { BiReply } from 'react-icons/bi';
// import { AiOutlineTwitter } from 'react-icons/ai';
// import { ThemeProvider } from '@mui/material';
// import { palette } from '../../Styles/theme';
// import jamElapsedTime from '../userComp/JamElapsedTime';
// import WriteComment from './WriteComment';
import ReplyComment from './ReplyComment';

// const RootContainer = css`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ReplyIconContainer = css`
//   width: 8%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   transform: rotate(180deg);
// `;

// const Container = css`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: flex-start;
// `;

// const UserBox = css`
//   display: flex;
//   width: 100%;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 10px;
//   padding: 3px;
//   margin-bottom: 5px;
// `;

// const Time = css`
//   margin-left: auto;
// `;

// const JamIcon = css`
//   color: ${palette.colorGrade3};
// `;

// const UserName = css`
//   font-size: 13px;
// `;

// const WrittenComment = css`
//   width: 100%;
//   height: fit-content;
//   padding: 10px;
//   border-radius: 3px;
//   background-color: #fff;
// `;

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

const ReReplyComment = ({
  postId,
  comments,
  // userData,
  setComments,
}) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0); // 대댓글의 개수
  const [openReply, setOpenReply] = useState(false);

  const ViewReplyHandler = () => {
    setOpenReply(!openReply);
  };

  // 댓글에 몇 개의 대댓글이 있는지 계산하는 로직
  useEffect(() => {
    let commentNumber = 0;
    // 댓글 전체 리스트를 가져온 후 각 댓글의 responseTo가 현재 렌더하는 comment의 id와 일치하는 갯수
    // eslint-disable-next-line array-callback-return, no-unused-expressions
    comments.length !== 0 && // 이게 없어서 maps 에러 났었음
      comments.map(el => {
        // console.log('el.responseTo: ', el.responseTo);
        // console.log('postId: ', postId);
        // if (el.postId === postId) {
        if (!el.isRoot && el.postId === postId) {
          // eslint-disable-next-line no-plusplus
          commentNumber++;
          // setChildCommentNumber(commentNumber);
        }
      });
    setChildCommentNumber(commentNumber);
  }, [comments]);

  // 댓글의 아이디(parentId)와 같은 id를 responseTo로 가진 것을 렌더
  // 대댓글 아래 대댓글이 있을 수 있으므로 ReplyComment와 ReplyComment를 같이 적어줌

  console.log('childCommentNumber: ', childCommentNumber);
  // console.log('comment: ', comment);
  console.log('comments 확인용: ', comments);

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
              // userData={userData}
              comments={comments}
              setComments={setComments}
            />
            {/* <ReReplyComment
              key={comment.contents}
              postId={postId}
              comment={comment}
              // userData={userData}
              comments={comments}
              setComments={setComments}
            /> */}
          </div>
        )}
      </div>
    ));

  return (
    <div css={TestViewReply}>
      {/* <div css={RootContainer}>
        <div css={ReplyIconContainer}>
          <BiReply size={30} />
        </div>
        <div css={Container}>
          <div css={UserBox}>
            <div>
              <FaUserCircle size={15} />
            </div>
            <div css={UserName}>사과잼</div>
            <ThemeProvider theme={palette}>
              <div css={JamIcon}>
                <AiOutlineTwitter size={16} />
              </div>
            </ThemeProvider>
            <p css={Time}>{jamElapsedTime('2022-11-25T14:25:42')}</p>
          </div>

          <div css={WrittenComment}>
            각공한거 공유하는 시간 30분정도 갖는거 어떠신가요?
          </div>
        </div>
      </div> */}
      {/* 대댓글의 개수가 0개 이상이면 렌더 */}
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
