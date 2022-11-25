import axios from 'axios';

const baseUrl =
  'https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=';

const getJuso = async regPattern => {
  return axios
    .get(`${baseUrl}${regPattern}`)
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default getJuso;
