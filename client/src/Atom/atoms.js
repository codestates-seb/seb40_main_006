import { atom } from 'recoil';

const location = atom({
  key: 'location',
  default: '서울특별시 강서구 마곡동',
});

const selectedCategory = atom({
  key: 'selectedCategory',
  default: '내 주변',
});

const loginUserInfoState = atom({
  key: 'loginUserInfo',
  default: {
    memberId: 1,
    nickname: '',
    img: '',
  },
});

const myPageInfoState = atom({
  key: 'mypageInfo',
  default: {
    memberId: loginUserInfoState.memberId,
    img: './img/orangeJam.png',
    nickname: '홍길동',
    grade: '5',
    평가수: '6',
    myJamList: [
      {
        jamId: 1,
        nickname: '홍길동',
        grade: 5,
        title: '참여한 잼입니다.',
        category: 'language',
        capacity: '10/10',
        location: '강남구',
        createdTime: '2022-11-22 01:00:04',
        views: 0,
        complete: false,
        realTime: true,
      },
    ],
    participationList: [
      {
        jamId: 1,
        nickname: '홍길동',
        grade: 5,
        title: '개설한 잼입니다.',
        category: 'language',
        capacity: '1/10',
        location: '송파구',
        createdTime: '2022-11-08 18:18:04',
        views: 0,
        complete: true,
        realTime: true,
      },
    ],
  },
});

export { location, selectedCategory, loginUserInfoState, myPageInfoState };
