/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { BsPlusCircle } from 'react-icons/bs';
import { palette } from '../Styles/theme';
// import Button from '../components/Button';
import StudyInputField from '../Components/jamOpenComponent/StudyInputField';
import JamInputField from '../Components/jamOpenComponent/JamInputField';
import Description from '../Components/jamOpenComponent/Description';
import EditButtonGroup from '../Components/jamOpenComponent/EditButtonGroup';
import Sidebar from '../Components/Sidebar';

const MergeContainer = css`
  display: flex;
`;

const Container = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  max-width: 800px;
`;

const Header = css`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
`;

const HeaderText = css`
  font-size: 15px;
  padding: 10px 0;
  margin-left: 5px;
`;

const HeaderTap = css`
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const OpenStudyButton = css`
  border-radius: 5px;
  border: none;
  background-color: #ffcabb;
  color: black;
  font-weight: 500;
  line-height: 20px;
  height: 40px;
  font-size: 14px;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
`;

const Tapstyle = css`
  width: 180px;
  height: 50px;
  font-size: 15px;
  text-align: center;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;

  .default {
    width: 100%;
    padding: 10px 6px;
    cursor: pointer;
    border: 1px solid ${palette.colorBtn3};
  }

  .focused {
    background-color: ${palette.colorMain};
    color: black;
    /* border-bottom: 5px solid ${palette.colorBtn2}; */
    transition: 0.2s;
  }

  button {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const FileUpload = css`
  width: 100%;
  height: 290px;
  background-color: #dddddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const SectionContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ArticleLeft = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
  margin-right: 10px;
`;

const ArticleRight = css`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Chatlink = css`
  width: 100%;
  height: 60px;
  border: 1px solid #dddddd;
  background-color: #dddddd;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  input,
  input:focus {
    font-size: 15px;
    border: none;
    padding: 0 15px;
    background-color: #dddddd;
    width: 100%;
    height: 90%;
    outline: none;
  }
`;

const JamOpen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isCreated, setIsCreated] = useState(false);

  const tapArr = [
    { id: 0, name: '스터디 잼', content: '스터디 잼 내용' },
    { id: 1, name: '실시간 잼', content: '실시간 잼 내용' },
  ];

  const selectTapHandler = el => {
    setCurrentTab(el.id);
  };

  return (
    <div css={MergeContainer}>
      <Sidebar />
      <div css={Container}>
        <header css={Header}>
          <div css={HeaderText}>카테고리 &gt; 요리</div>
          <div css={HeaderTap}>
            <ThemeProvider theme={palette}>
              <div css={Tapstyle}>
                {tapArr.map(el => (
                  <button
                    key={el.id}
                    type="button"
                    className={
                      currentTab === el.id ? 'default focused' : 'default'
                    }
                    onClick={() => selectTapHandler(el)}
                    aria-hidden="true"
                  >
                    {el.name}
                  </button>
                ))}
              </div>
            </ThemeProvider>
            {isCreated ? (
              <EditButtonGroup
                isCreated={isCreated}
                setIsCreated={setIsCreated}
              />
            ) : (
              <button
                css={OpenStudyButton}
                type="submit"
                form="test"
                onClick={() => setIsCreated(!isCreated)}
              >
                개설하기
              </button>
            )}

            {/* <Button
              size="md"
              variant="default"
              type="submit"
              form="test"
              // onClick={() => handleSubmit()}
            >
              개설하기
            </Button> */}
          </div>
        </header>
        <main css={SectionContainer} id="test">
          <div css={ArticleLeft}>
            <div css={FileUpload}>
              <BsPlusCircle size={40} />
              <span>스터디를 표현할 이미지를 추가해주세요</span>
            </div>
            <div css={Chatlink}>
              <input
                type="text"
                placeholder="잼 그룹원과 소통할 채팅 채널을 기재해주세요(카카오 오픈채팅 등)"
              />
            </div>
          </div>
          <div css={ArticleRight}>
            {currentTab === 0 ? <StudyInputField /> : <JamInputField />}
          </div>
        </main>
        <Description />
      </div>
    </div>
  );
};

export default JamOpen;
