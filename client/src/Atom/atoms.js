import { atom } from 'recoil';

export const location = atom({
  key: 'location',
  default: '서울특별시 강서구 마곡동',
});

export const _ = atom({
  key: '_',
  default: '_',
});
