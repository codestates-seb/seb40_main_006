import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_URL}`;

export const fetchJamRead = async endPoint => {
  return axios
    .get(BASE_URL + endPoint)
    .then(res => {
      if (!res.ok) {
        // console.log(res);
      }
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export default fetchJamRead;
