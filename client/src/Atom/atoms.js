import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const totalJamLength = atom({
  key: 'totalJamLength',
  default: 0,
});

const pageNumber = atom({
  key: 'pageNumber',
  default: 1,
});

const location = atom({
  key: 'location',
  default: '서울특별시 강서구 마곡동',
});

const coordinate = atom({
  key: 'coordinate',
  default: {
    latitude: 37.5602098,
    longitude: 126.825479,
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
    gradeCount: '',
  },
  effects_UNSTABLE: [persistAtom],
});

const jamGradeState = atom({
  key: 'jamGrade',
  default: {
    name: '',
  },
  effects_UNSTABLE: [persistAtom],
});

const imgUrlState = atom({
  key: 'imgUrl',
  default: {
    name: '',
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
    grade: '',
    평가수: '',
    joinJamList: [
      {
        jamId: '',
        nickname: '',
        grade: '',
        title: '',
        category: '',
        capacity: '',
        location: '',
        createdTime: '',
        views: '',
        complete: '',
        realTime: '',
      },
    ],
    createJamList: [
      {
        jamId: '',
        nickname: '',
        grade: '',
        title: '',
        category: '',
        capacity: '',
        location: '',
        createdTime: '',
        views: '',
        complete: '',
        realTime: true,
      },
    ],
  },
});

export {
  totalJamLength,
  pageNumber,
  location,
  coordinate,
  selectedCategory,
  isLoginState,
  loginUserInfoState,
  myPageInfoState,
  jamGradeState,
  imgUrlState,
};
