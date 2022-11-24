/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
// import { BsPlusCircle } from 'react-icons/bs';
import { palette } from '../Styles/theme';
// import Button from '../components/Button';
import StudyInputField from '../Components/jamCreateComponent/StudyInputField';
import JamInputField from '../Components/jamCreateComponent/JamInputField';
import Description from '../Components/jamCreateComponent/Description';
import EditButtonGroup from '../Components/jamCreateComponent/EditButtonGroup';
import Sidebar from '../Components/Sidebar';
import FileUploader from '../Components/jamCreateComponent/FileUploader';

const MergeContainer = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Container = css`
  margin: 10px 30px;
  width: 100%;
  height: 100%;
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

const SectionContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ArticleLeft = css`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  margin-right: 10px;
  /* background-color: #563254; */
`;

const ArticleRight = css`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChatlinkBox = css`
  width: 100%;
  height: 60px;
  border: 1px solid #dddddd;
  background-color: #dddddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    font-size: 15px;
    border: none;
    padding: 0 15px;
    background-color: #dddddd;
    width: 100%;
    outline: none;
    &:focus {
      font-size: 15px;
      border: none;
      padding: 0 15px;
      background-color: #dddddd;
      width: 100%;
      outline: none;
    }
  }
`;

const JamCreate = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isCreated, setIsCreated] = useState(false);

  const [period, setPeriod] = useState([new Date(), new Date()]);
  // const periodRef = useRef([new Date(), new Date()]);
  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const capacityRef = useRef(null);

  const jamTitleRef = useRef(null);
  const jamCategoryRef = useRef(null);
  const jamCapacityRef = useRef(null);

  const descRef = useRef(null);

  const tapArr = [
    { id: 0, name: '스터디 잼', content: '스터디 잼 내용' },
    { id: 1, name: '실시간 잼', content: '실시간 잼 내용' },
  ];

  const selectTapHandler = el => {
    setCurrentTab(el.id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line
    // const now = new Date()
    const CURRENT_DATE_TIME = new Date();
    const TODAY_MIDNIGHT_TIME = new Date(
      new Date().setHours(24, 0, 0, 0),
    ).toLocaleString();

    // eslint-disable-next-line
    // console.log(typeof CURRENT_DATE_TIME);
    // eslint-disable-next-line
    // console.log(typeof TODAY_MIDNIGHT_TIME);
    // eslint-disable-next-line
    console.log({
      title:
        currentTab !== 0 ? jamTitleRef.current.value : titleRef.current.value,
      content: descRef.current.value,
      category:
        currentTab !== 0
          ? jamCategoryRef.current.value
          : categoryRef.current.value,
      capacity:
        currentTab !== 0
          ? jamCapacityRef.current.value
          : capacityRef.current.value,
      jamFrom: currentTab !== 0 ? CURRENT_DATE_TIME : period[0],
      jamTo: currentTab !== 0 ? TODAY_MIDNIGHT_TIME : period[1],
      realtime: currentTab !== 0,
    });
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
              <button css={OpenStudyButton} type="submit" form="makeStudy">
                개설하기
              </button>
            )}
          </div>
        </header>
        <form id="makeStudy" onSubmit={handleSubmit}>
          <main css={SectionContainer}>
            <div css={ArticleLeft}>
              <div>
                <FileUploader />
              </div>
              <div css={ChatlinkBox}>
                <input
                  type="text"
                  name="chatLink"
                  placeholder="잼 그룹원과 소통할 채팅 채널을 기재해주세요(카카오 오픈채팅 등)"
                />
              </div>
            </div>
            <div css={ArticleRight}>
              {currentTab === 0 ? (
                <StudyInputField
                  titleRef={titleRef}
                  categoryRef={categoryRef}
                  capacityRef={capacityRef}
                  // periodRef={periodRef}
                  period={period}
                  setPeriod={setPeriod}
                />
              ) : (
                <JamInputField
                  jamTitleRef={jamTitleRef}
                  jamCategoryRef={jamCategoryRef}
                  jamCapacityRef={jamCapacityRef}
                />
              )}
            </div>
          </main>
          <Description descRef={descRef} />
        </form>
      </div>
    </div>
  );
};

export default JamCreate;
