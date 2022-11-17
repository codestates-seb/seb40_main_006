/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React from 'react';
import palette from '../Styles/theme';

const sidebar = css`
  width: 220px;
  padding-bottom: 50px;
  border: 1px ${palette.gray_4} solid;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: ${palette.colorMain};
  }
  & > ul {
    padding: 10px;
  }
  & > ul > li {
    padding: 12px;
    border-radius: 5px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: ${palette.colorMain};
    }
  }
`;

const categoryDummy = [
  {
    name: '내 주변',
  },
  {
    name: '전체',
  },
  {
    name: '운동/건강',
  },
  {
    name: '라이프스타일',
  },
  {
    name: '요리',
  },
  {
    name: '미술',
  },
  {
    name: '커리어',
  },
  {
    name: '공예',
  },
  {
    name: '사진/영상',
  },
  {
    name: '음악',
  },
  {
    name: '외국어',
  },
  {
    name: '교육',
  },
  {
    name: '재테크',
  },
  {
    name: '비즈니스',
  },
  {
    name: '개발',
  },
];

const Sidebar = () => {
  const onCategoryClick = e => {
    console.log(e.target.innerText);
  };
  return (
    <div className={sidebar}>
      <div>카테고리</div>
      <ul>
        {categoryDummy.map(el => (
          <li onClick={onCategoryClick} key={el.name}>
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
