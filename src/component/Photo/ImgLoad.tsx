import styled from 'styled-components';
import imgLoad from '../../assets/imgLoad.svg';
import circle from '../../assets/Circle.svg';
import nutritionist2 from '../../assets/nutritionist2.svg';
import { useRef, useState } from 'react';
import Button from '../common/Button';
import ScanBar from './ScanBar';

const ImgContainer = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  width: 330px;
  height: 225px;
`;

const LoadImg = styled.img`
  max-width: 270px;
  max-height: 220px;
`;

const ImgUpload = styled.input`
  display: none;
`;

const CircleImg = styled.img`
  margin-right: 0.36rem;
`;

const NutritionistImg = styled.img`
  position: absolute;
  left: 5px;
  top: 5px;
`;

const Explanation = styled.figcaption`
  position: relative;
  display: flex;
  align-items: center;

  margin-top: 1.8rem;

  font-size: 0.875rem;
  font-weight: var(--font-regular);

  b {
    margin: 0 0.2rem;
  }
`;

const StateText = styled.figcaption`
  margin-bottom: 0.3rem;
  color: #999;
  font-size: 0.875rem;
  font-weight: var(--font-regular);

  text-align: center;
`;

const ButtonStateText = styled(StateText)`
  font-weight: var(--font-bold);
`;

const ScanbarContainer = styled.div`
  position: relative;
`;

const ImgLoad = () => {
  const [imgFile, setImgFile] = useState(imgLoad);
  const [isScan, setIsScan] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const isImgUpload = imgFile !== imgLoad;

  const handlerImgLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const dataURL = event.target?.result;
        if (typeof dataURL === 'string' && imgRef.current) {
          imgRef.current.src = dataURL;
          setImgFile(dataURL);
          setIsScan(true);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleButtonImgLoad = () => {
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <label htmlFor="file">
        <ImgContainer>
          <ScanbarContainer>
            <LoadImg src={imgFile} alt="Loaded Image" ref={imgRef}></LoadImg>
            {isScan && (
              <ScanBar
                height={imgRef.current ? imgRef.current.offsetHeight : 0}
                isScan={isScan}
              ></ScanBar>
            )}
          </ScanbarContainer>
          {/* <div style={{ position: 'relative' }}></div> */}
          <ImgUpload
            type="file"
            id="file"
            name="file"
            accept="image/*"
            disabled={isScan}
            onChange={handlerImgLoad}
          />

          {!isImgUpload && (
            <Explanation>
              <CircleImg src={circle} />
              <NutritionistImg src={nutritionist2}></NutritionistImg>
              식품의 <b> 원재료명 </b> 사진을 업로드해주세요
            </Explanation>
          )}
        </ImgContainer>
      </label>

      {isImgUpload && (
        <StateText>사진이 흔들리지 않았는지 확인해주세요.</StateText>
      )}
      <Button isDisabled={isScan} onClick={handleButtonImgLoad}>
        {isScan ? <ButtonStateText>스캔중...</ButtonStateText> : '사진 업로드'}
      </Button>
    </>
  );
};

export default ImgLoad;
