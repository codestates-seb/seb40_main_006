/** @jsxImportSource @emotion/react */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { BsPlusCircle } from 'react-icons/bs';
import { palette } from '../../Styles/theme';

const Container = css`
  width: 100%;
  height: 100%;
`;

const UploaderWrapper = css`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px dashed ${palette.border};
  border-radius: 3px;
  margin-bottom: 7px;

  .img-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: grey;
    font-size: 17px;
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ImgBox = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const UploadButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* margin: 5px; */
`;

const BASE_URL = `${process.env.REACT_APP_URL}`;

const Uploader = ({ image, setImage }) => {
  // 기타 데이터와 한번에 submit 하기 위해 상위 컴포넌트로 이동후 전달
  // const [image, setImage] = useState({
  //   image_file: '',
  //   previewURL: uploadImage,
  // });
  // const [profileFile, setProfileFile] = useState(null);
  // const [img, setImg] = useState('');

  const fileInputRef = useRef(null);

  // const dataURLtoFile = (dataurl, fileName) => {
  //   const arr = dataurl.split(',');
  //   const mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);

  //   // eslint-disable-next-line no-plusplus
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], fileName, { type: mime });
  // };

  // const getImage = async () => {
  //   const b64data = defaultImage.current.currentSrc;
  //   const imagefile = dataURLtoFile(b64data, 'defaultImage.jpeg');
  //   return imagefile;
  // };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const saveImage = async e => {
    e.preventDefault();
    // eslint-disable-next-line no-shadow
    // const img = e.target.files[0];
    // console.log('img', img);
    // setImage(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    for (const [key, value] of formData.entries()) {
      console.log([key, value]);
    }

    // eslint-disable-next-line no-undef
    await axios
      .post(`${BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        setImage({ previewURL: res.data });
      })
      .catch(err => {
        console.log(err.Error);
      });
  };

  // setImage(() => ({
  //   image_file: e.target.files[0],
  // }));
  // };

  // const sendImageToServer = async () => {
  //   // if (image.image_file) {
  //   const formData = new FormData();
  //   formData.append('file', image.image_file);
  //   // formData.append('upload_preset', 'mvrdnxnf');

  //   for (const [key, value] of formData.entries()) {
  //     console.log([key, value]);
  //   }

  //   // await axios.post('/이미지업로드용api', formData)
  //   await axios
  //     .post('/upload', formData, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       alert('파일이 성공적으로 등록되었습니다!');
  //       // res.blob();
  //     });
  // }

  // useEffect(() => {
  //   // 구독 취소로 컴포넌트가 언마운트되면 생성되었던 기존 URL을 폐기
  //   return () => {
  //     URL.revokeObjectURL(image.previewURL);
  //   };
  // }, []);

  // const handleClickFileInput = () => {
  //   fileInputRef.current.click();
  // };

  // const saveImage = e => {
  //   e.preventDefault();
  //   // 타겟팅한 파일 값 확인
  //   // console.log(e.target.files[0]);

  //   if (e.target.files[0]) {
  //     // 새로운 이미지를 올리면 revokeObjectURL()을 통해 생성한 기존 URL을 먼저 폐기하고
  //     URL.revokeObjectURL(image.previewURL);
  //     // createObjectURL()을 통해 새로 올린 파일에 대한 URL을 생성하여
  //     const previewURL = URL.createObjectURL(e.target.files[0]);
  //     console.log(e.target.files[0]);
  //     // 현재 다루는 이미지에 대한 상태를 set으로 업데이트
  //     setImage(() => ({
  //       image_file: e.target.files[0],
  //       previewURL,
  //     }));
  //   }
  // };

  // const deleteImage = () => {
  //   // 생성되었던 기존 URL 폐기
  //   URL.revokeObjectURL(image.previewURL);
  //   setImage({
  //     image_file: '',
  //     previewURL: null,
  //   });
  // };

  // const sendImageToServer = async () => {
  //   if (image.image_file) {
  //     const formData = new FormData();
  //     formData.append('file', image.image_file);
  //     // formData.append('upload_preset', 'mvrdnxnf');

  //     // await axios.post('/이미지업로드용api', formData)
  //     await axios
  //       .post('/upload', formData, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       })
  //       .then(res => {
  //         console.log(res);
  //         alert('파일이 성공적으로 등록되었습니다!');
  //         res.blob();
  //       });

  //     // const res = await fetch(`/upload`, {
  //     //   method: 'POST',
  //     //   body: formData,
  //     // });

  //     // // 이미지 업로드 이후이므로 이미지 상태를 다시 초기화
  //     // setImage({
  //     //   image_file: '',
  //     //   // previewURL: null,
  //     //   // previewURL: image.previewURL,
  //     //   previewURL: res,
  //     // });
  //     // console.log(res.url);
  //     // return res.json();
  //     // return res.blob();
  //   }
  //   alert('사진을 등록하세요!');
  // };

  console.log('image: ', image);
  // console.log('profileFile: ', profileFile);

  return (
    <div css={Container}>
      <label htmlFor="inputFile">
        <div css={UploaderWrapper}>
          <div className="img-wrapper">
            {!image.previewURL ? (
              <div css={ImgBox}>
                <BsPlusCircle size={45} />
                <span>스터디를 표현할 이미지를 추가해주세요</span>
              </div>
            ) : (
              <img src={image.previewURL} alt="studyimage" />
            )}
          </div>
          <input
            id="inputFile"
            type="file"
            accept="image/*"
            onChange={saveImage}
            // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있음
            // onClick={e => e.target.value === null}
            ref={fileInputRef}
            onClick={handleClickFileInput}
            hidden
            style={{ display: 'none' }}
          />
        </div>
      </label>
      {/* {image.previewURL && ( */}
      <div css={UploadButton}>
        <Button
          type="primary"
          variant="contained"
          // onClick={() => inputRef.click()}
          onClick={handleClickFileInput}
        >
          미리보기
        </Button>
        {/* <Button color="error" variant="contained" onClick={deleteImage}>
            삭제
          </Button> */}
        {/* <Button color="success" variant="contained" onClick={sendImageToServer}>
          업로드
        </Button> */}
      </div>
    </div>
  );
};

export default Uploader;
