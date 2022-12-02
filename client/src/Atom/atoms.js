import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const location = atom({
  key: 'location',
  default: '서울특별시 강서구 마곡동',
});

const coordinate = atom({
  key: 'coordinate',
  default: {
    latitude: 37.56601271738172,
    longitude: 126.82692903814433,
  },
});

const selectedCategory = atom({
  key: 'selectedCategory',
  default: { value: 'all', label: '전체', param: 'ALL' },
});

const loginUserInfoState = atom({
  key: 'loginUserInfo',
  default: {
    memberId: '',
    nickname: '',
    img: '',
    grade: '',
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
    memberId: '',
    img: '',
    nickname: '',
    grade: '5',
    평가수: '6',
    joinJamList: [
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
    createJamList: [
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
  coordinate,
  selectedCategory,
  isLoginState,
  loginUserInfoState,
  myPageInfoState,
};
