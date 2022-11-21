import { css } from '@emotion/css';
import { useEffect } from 'react';
import { palette } from '../../Styles/theme';
import getJuso from './getJuso';

const addressContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
  padding: 20px;
`;
const address = css`
  background-color: ${palette.gray_4};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  padding: 15px 10px;
`;

const Address = () => {
  // const [location, setLocation] = useState('');
  function getData(code) {
    const apiLocation = getJuso(code);
    apiLocation.then(data => {
      // setLocation(data.regcodes[0].name);
      // console.log(data.regcodes[0].name);
      console.log(data.regcodes);
      console.log(data.regcodes.filter(v => v.code === '1153000000'));

      // console.log(location);
    });
  }

  const codeExample = [
    '*00000000', // 대한민국의 모든 특별/광역시, 도 반환
    '11*', // 서울시 소속 모든 구, 동 반환
    '11*000000', // 서울시 소속 모든 구 반환
    '1153*', // 구로구를 포함한 구로구의 모든 동 반환
    '1153*&is_ignore_zero=true', // 구로구의 모든 동만 반환
  ];
  useEffect(() => {
    codeExample.forEach(el => getData(el));
  }, []);
  return (
    <div className={addressContainer}>
      <div className={address}>주소 선택 영역</div>
    </div>
  );
};

export default Address;
