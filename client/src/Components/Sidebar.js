/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import { css } from '@emotion/css';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { palette } from '../Styles/theme';
import { selectedCategory } from '../Atom/atoms';
import categories from '../Static/categories';

const sidebar = css`
  width: 220px;
  padding-bottom: 50px;
  border: 1px ${palette.gray_4} solid;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 70px;
    flex-direction: row;
    padding-bottom: 0px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: ${palette.colorMain};
    @media screen and (max-width: 767px) {
      height: 50px;
      display: none;
    }
  }
  & > ul {
    padding: 10px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 767px) {
      flex-direction: row;
      overflow: scroll;
      margin: 0;
    }
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

    @media screen and (max-width: 767px) {
      background-color: ${palette.gray_4};
      border-radius: 50px;
      display: inline-block;
      padding: 12px;
    }
  }
`;

const Sidebar = () => {
  const [currentCategory, setCurrentCategory] =
    useRecoilState(selectedCategory);
  const navigate = useNavigate();

  const onCategoryClick = e => {
    setCurrentCategory(
      categories.filter(el => el.label === e.target.innerText)[0],
    );
    navigate('/category');
    sessionStorage.clear();
  };

  useEffect(() => {}, [currentCategory]);
  return (
    <div className={sidebar}>
      <div>카테고리</div>
      <ul>
        {categories.map(el => (
          <li onClick={onCategoryClick} key={el.value}>
            {el.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
