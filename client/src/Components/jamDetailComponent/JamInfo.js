/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
import React from 'react';
import { css } from '@emotion/react';
import { BiCategory } from 'react-icons/bi';
import { BsClockFill, BsPeopleFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeProvider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { palette } from '../../Styles/theme';
import JamCarousel from './JamCarousel';
import jamElapsedTime from '../userComp/JamElapsedTime';
import { categories } from '../jamCreateComponent/StudyInputField';
import JamLocationMap from './JamLocationMap';

const Container = css`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 30px;
`;

const TitleContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = css`
  font-size: 24px;
  margin-bottom: 5px;
`;

const InfoIcons = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  .categoryIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
  }
`;

const Carousel = css`
  width: 100%;
`;

const JamDescTitle = css`
  font-size: 15px;
  margin-bottom: 15px;
  margin-left: 2px;
  font-weight: 600;
`;

const LocationContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
`;

const LocationText = css`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 15px;
  font-weight: 600;
`;

const LocationMap = css`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.border};
`;

const EditButton = css`
  min-width: 60px;
  min-height: 40px;
  padding: 10px;
  background-color: ${palette.border};
  border-radius: 3px;
`;

const JamInfo = ({ host, loginUser, setIsEdit, jamData }) => {
  // const [filteredCategory, setFilteredCategory] = useState([])

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log('id: ', id);

  const {
    title,
    location,
    nickname,
    currentPpl,
    capacity,
    createdAt,
    category,
  } = jamData;

  const filteredCategory = categories.filter(el => el.value === category)[0];
  // console.log('filteredCategory: ', filteredCategory);

  const handleIsEdit = () => {
    setIsEdit(true);
    navigate(`/jammake/edit/${id}`);
  };
  // console.log(isEdit);

  return (
    <div css={Container}>
      <div css={HeaderContainer}>
        <div css={TitleContainer}>
          <h2 css={Title}>{title}</h2>
          {host === loginUser && (
            <button css={EditButton} type="button" onClick={handleIsEdit}>
              수정
            </button>
          )}
        </div>
        <div css={InfoIcons}>
          <div className="categoryIcons">
            <BiCategory />
            {filteredCategory && <span>{filteredCategory.label}</span>}
          </div>
          <div className="categoryIcons">
            <BsClockFill />
            <span>{jamElapsedTime(createdAt)}</span>
          </div>
          <div className="categoryIcons">
            <BsPeopleFill />
            <span>
              {currentPpl}/{capacity}명
            </span>
          </div>
          <div className="categoryIcons">
            <ImLocation />
            <span>{location}</span>
          </div>
          <div className="categoryIcons">
            <FaUserCircle />
            <span>{nickname}</span>
          </div>
        </div>
      </div>
      <div css={Carousel}>
        <div css={JamDescTitle}>
          <span>우리 잼을 소개합니다</span>
        </div>
        <JamCarousel jamData={jamData} />
      </div>
      <div css={LocationContainer}>
        <div css={LocationText}>
          <span>우리 잼은 여기 있어요</span>
        </div>
        <ThemeProvider theme={palette}>
          <div css={LocationMap}>
            {jamData && <JamLocationMap jamData={jamData} />}
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default JamInfo;
