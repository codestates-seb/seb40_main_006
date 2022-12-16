/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import { palette } from '../Styles/theme';
// import Button from '../components/Button';
import StudyInputField from '../Components/jamCreateComponent/StudyInputField';
import JamInputField from '../Components/jamCreateComponent/JamInputField';
import Description from '../Components/jamCreateComponent/Description';
import EditButtonGroup from '../Components/jamCreateComponent/EditButtonGroup';
import Sidebar from '../Components/Sidebar';
import Uploader from '../Components/jamCreateComponent/Uploader';
// import FileUploader from '../Components/jamCreateComponent/FileUploader';
import { getCookie } from '../Components/SignComp/Cookie';

const MergeContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 767px) {
    flex-direction: column;
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
  margin: 10px 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  @media screen and (max-width: 767px) {
    margin: 10px 20px;
    width: 95%;
  }
  @media screen and (max-width: 479px) {
    padding: 0 10px;
    width: 95%;
  }
`;

const Header = css`
  width: 100%;
  max-width: 790px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  @media screen and (max-width: 767px) {
    /* max-width: 650px; */
  }
  @media screen and (max-width: 479px) {
    max-width: 460px;
  }
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
    transition: 0.2s;
  }

  button {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const FormContainer = css`
  width: 100%;
  max-width: 790px;
  @media screen and (max-width: 479px) {
    width: 100%;
    max-width: 460px;
  }
`;

const SectionContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 479px) {
    max-width: 460px;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const ArticleLeft = css`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  margin-right: 10px;
  min-width: 300px;
  @media screen and (max-width: 479px) {
    margin-right: 0;
  }
`;

const ArticleRight = css`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 479px) {
    width: 100%;
    max-width: none;
  }
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

const BASE_URL = `${process.env.REACT_APP_URL}`;

const CURRENT_DATE_TIME = new Date();
const TODAY_MIDNIGHT_TIME = new Date(new Date().setHours(23, 59, 59, 59));

// console.log('TODAY_MIDNIGHT_TIME: ', TODAY_MIDNIGHT_TIME);

const JamMake = ({ isEdit }) => {
  // eslint-disable-next-line no-unused-vars
  const [jamData, setJamData] = useState([]);
  const [currentTab, setCurrentTab] = useState(false);
  const [image, setImage] = useState({
    image_file: '',
    previewURL: null,
  });
  const [period, setPeriod] = useState([new Date(), new Date()]);
  const [locationText, setLocationText] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [capacity, setCapacity] = useState('');

  const [jamTitle, setJamTitle] = useState('');
  const [jamCategory, setJamCategory] = useState('');
  const [jamCapacity, setJamCapacity] = useState('');

  const [desc, setDesc] = useState('');
  const [chatLink, setChatLink] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const tapArr = [
    { id: false, name: '스터디 잼', content: '스터디 잼 내용' },
    { id: true, name: '실시간 잼', content: '실시간 잼 내용' },
  ];

  const accessToken = getCookie('accessToken');

  const selectTapHandler = el => {
    setCurrentTab(el.id);
  };

  const validate = () => {
    if (
      !period ||
      !locationText ||
      !(title || jamTitle) ||
      !(category || jamCategory) ||
      !(capacity || jamCapacity) ||
      !desc ||
      !chatLink
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!accessToken) {
      alert('토큰이 만료 되었습니다');
      navigate('/login');
      window.location.reload();
    }

    if (!validate()) {
      // eslint-disable-next-line no-alert
      alert('입력사항을 작성해주셔야 잼이 개설됩니다');
    } else {
      // 1. 현재 시간(Locale)
      const curr0 = new Date(period[0]);
      const curr1 = new Date(period[1]);
      // 2. UTC 시간 계산
      const utc0 = curr0.getTime() + curr0.getTimezoneOffset() * 60 * 1000;
      const utc1 = curr1.getTime() + curr1.getTimezoneOffset() * 60 * 1000;
      // 3. UTC to KST (UTC + 9시간)
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const krCurr0 = new Date(utc0 + KR_TIME_DIFF);
      const krCurr1 = new Date(utc1 + KR_TIME_DIFF);

      // eslint-disable-next-line no-console
      const mainData = {
        title: currentTab ? jamTitle : title,
        content: desc,
        capacity: currentTab ? Number(jamCapacity) : Number(capacity),
        category: currentTab ? jamCategory : category,
        jamFrom: currentTab ? CURRENT_DATE_TIME : krCurr0,
        jamTo: currentTab ? TODAY_MIDNIGHT_TIME : krCurr1,
        realTime: currentTab,
        openChatLink: chatLink,
        location: locationText,
        image: image.previewURL,
        longitude,
        latitude,
        address,
      };

      await axios
        .post(`${BASE_URL}/jams/write`, mainData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => {
          navigate(`/jamdetail/${res.data.jamId}`);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  };

  const getJamForEdit = async () => {
    // eslint-disable-next-line no-return-await
    return await axios
      .get(`${BASE_URL}/jams/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // eslint-disable-next-line no-console
  const patchData = {
    title: currentTab ? jamTitle : title,
    content: desc,
    capacity: currentTab ? Number(jamCapacity) : Number(capacity),
    category: currentTab ? jamCategory : category,
    jamFrom: currentTab ? CURRENT_DATE_TIME : period[0],
    jamTo: currentTab ? TODAY_MIDNIGHT_TIME : period[1],
    realTime: currentTab,
    openChatLink: chatLink,
    location: locationText,
    image: image.previewURL,
    longitude,
    latitude,
    address,
  };

  useEffect(() => {
    isEdit &&
      getJamForEdit().then(data => {
        if (data) {
          setJamData(data);
          setCurrentTab(data.realTime);
          setLocationText(data.location);
          setTitle(data.title);
          setCategory(data.category);
          setCapacity(data.capacity);

          setLongitude(data.longitude);
          setLatitude(data.latitude);
          setAddress(data.address);
          setPeriod([new Date(data.jamFrom), new Date(data.jamTo)]);

          setJamTitle(data.title);
          setJamCategory(data.category);
          setJamCapacity(data.capacity);

          setDesc(data.content);
          setChatLink(data.openChatLink);
          setImage({
            image_file: '',
            previewURL: data.image,
          });
        }
      });
  }, []);

  const handleChatLink = e => {
    setChatLink(e.target.value);
  };

  return (
    <div css={MergeContainer}>
      <div css={sidebarContainer}>
        <Sidebar />
      </div>
      <div css={Container}>
        <header css={Header}>
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
            {isEdit ? (
              <EditButtonGroup patchData={patchData} />
            ) : (
              <button css={OpenStudyButton} type="submit" form="makeStudy">
                개설하기
              </button>
            )}
          </div>
        </header>
        <form id="makeStudy" css={FormContainer} onSubmit={handleSubmit}>
          <main css={SectionContainer}>
            <div css={ArticleLeft}>
              <div>
                {/* <FileUploader /> */}
                <Uploader image={image} setImage={setImage} />
              </div>
              <div css={ChatlinkBox}>
                <input
                  value={chatLink}
                  onChange={handleChatLink}
                  type="text"
                  name="chatLink"
                  placeholder="잼 그룹원과 소통할 채팅 채널을 기재해주세요(카카오 오픈채팅 등)"
                />
              </div>
            </div>
            <div css={ArticleRight}>
              {!currentTab ? (
                <StudyInputField
                  title={title}
                  category={category}
                  capacity={capacity}
                  period={period}
                  setPeriod={setPeriod}
                  locationText={locationText}
                  setLocationText={setLocationText}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setAddress={setAddress}
                  setTitle={setTitle}
                  setCategory={setCategory}
                  setCapacity={setCapacity}
                />
              ) : (
                <JamInputField
                  jamTitle={jamTitle}
                  jamCategory={jamCategory}
                  jamCapacity={jamCapacity}
                  locationText={locationText}
                  setLocationText={setLocationText}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setAddress={setAddress}
                  setJamTitle={setJamTitle}
                  setJamCategory={setJamCategory}
                  setJamCapacity={setJamCapacity}
                />
              )}
            </div>
          </main>
          <Description desc={desc} setDesc={setDesc} />
        </form>
      </div>
    </div>
  );
};

export default JamMake;
