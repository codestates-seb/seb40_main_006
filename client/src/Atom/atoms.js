import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
    memberId: '',
    nickname: '',
    img: '',
  },
  effects_UNSTABLE: [persistAtom],
});

const isLoginState = atom({
  key: 'login',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 해당 마이페이지 유저의 정보 (로그인된 유저 아님)
const myPageInfoState = atom({
  key: 'mypageInfo',
  default: {
    memberId: 1,
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

export {
  location,
  selectedCategory,
  isLoginState,
  loginUserInfoState,
  myPageInfoState,
};
