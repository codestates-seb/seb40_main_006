import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_URL}`;

export const fetchJamRead = async endPoint => {
  return axios
    .get(BASE_URL + endPoint)
    .then(res => {
      if (!res.ok) return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchJamSearch = async param => {
  return axios({
    method: 'get',
    url: `${BASE_URL}/jams/search?keyword=${param}`,
  })
    .then(res => {
      if (!res.ok) return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
