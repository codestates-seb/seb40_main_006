/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  getCookie,
  removeCookie,
  setCookie,
} from '../Components/SignComp/Cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

// eslint-disable-next-line func-names
api.interceptors.request.use(function (config) {
  config.headers.access = getCookie('accessToken');
  config.headers.refresh = getCookie('refreshToken');
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === '토큰만료시 받게될 에러') {
      try {
        const originalRequest = error.config;
        const data = await api.get('토큰 재발급 api');
        if (data) {
          const { access, refresh } = data.data;
          removeCookie('accessToken');
          removeCookie('refreshToken');
          setCookie('accessToken', access);
          setCookie('refreshToken', refresh);
          originalRequest.headers.access = access;
          originalRequest.headers.refresh = refresh;
          return await api.request(originalRequest);
        }
      } catch (e) {
        // 토큰 재발급에 실패한 경우
        console.log(e.error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === '토큰만료시 받게될 에러') {
      try {
        const originalRequest = error.config;
        const data = await api.get('토큰 재발급 api');
        if (data) {
          const { access, refresh } = data.data;
          removeCookie('accessToken');
          removeCookie('refreshToken');
          setCookie('accessToken', access);
          setCookie('refreshToken', refresh);
          originalRequest.headers.access = access;
          originalRequest.headers.refresh = refresh;
          return await api.request(originalRequest);
        }
      } catch (error) {
        // 토큰 재발급에 실패한 경우
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
