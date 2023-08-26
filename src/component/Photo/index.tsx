import styled from 'styled-components';
import Back from '../common/Back';
import imgLoad from '../../assets/imgLoad.svg';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Header = styled.header`
  width: 100%;
`;

const LoadImg = styled.img`
  max-width: 270px;
  max-height: 211px;
`;

const ImgUpload = styled.input`
  display: none;
`;

const PhotoPage = () => {
  const [imgFile, setImgFile] = useState(imgLoad);

  const handlerImgLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const dataURL = event.target?.result;
        if (typeof dataURL === 'string') {
          setImgFile(dataURL);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Back />
      </Header>

      <label htmlFor="file">
        <LoadImg src={imgFile} alt="Loaded Image" />
      </label>
      <ImgUpload
        type="file"
        id="file"
        name="file"
        onChange={handlerImgLoad}
      ></ImgUpload>
    </Wrapper>
  );
};

export default PhotoPage;
