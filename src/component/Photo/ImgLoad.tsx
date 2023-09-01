import styled, { keyframes } from 'styled-components';
import imgLoad from '../../assets/imgLoad.svg';
import circle from '../../assets/circle.svg';
import nutritionist from '../../assets/nutritionist.svg';
import chemist from '../../assets/chemist.svg';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import ScanBar from './ScanBar';
import { requestOCR } from '@/api/ocr';
import { InputImage, ScanImg, ValuesRef } from '@/types/photo';
import { ingredients } from '@/api/ingredients';
import CropperModal from './CropperModal';
import { ReactCropperElement } from 'react-cropper';
import { useLocation } from 'react-router-dom';

const ImgContainer = styled.figure<{ $isScan: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  width: 310px;
  height: 220px;
  margin: ${({ $isScan }) => ($isScan ? '0 0 30px 0' : '0')};
`;

const LoadImg = styled.img`
  max-width: 270px;
  max-height: 210px;
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

  position: absolute;
  top: 268px;
`;

const scanAnimation = keyframes`
  0%, 100% {
    content: "스캔중.";
  }
  33% {
    content: "스캔중..";
  }
  66% {
    content: "스캔중...";
  }
`;

const ButtonStateText = styled.div`
  &:before {
    content: '스캔중.';
    animation: ${scanAnimation} 1.2s infinite steps(3);
  }

  margin-bottom: 0.3rem;
  color: var(--color-sub-2);
  font-size: 1.1rem;
  font-weight: var(--font-regular);

  text-align: center;
  font-weight: var(--font-bold);
`;

const EndText = styled(StateText)`
  color: var(--color-danger);
`;

const ScanbarContainer = styled.div`
  position: relative;
`;

interface ImgLoad {
  valuesRef: React.MutableRefObject<ValuesRef | null>;
  isScan: boolean;
  scanToggle: (prevState: boolean) => void;
}

const ImgLoad = ({ valuesRef, isScan, scanToggle }: ImgLoad) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputImage, setInputImage] = useState<InputImage>({
    imgURL: imgLoad,
    beforeImg: imgLoad,
    imageFileName: null,
    imageFileFormat: null,
  });
  const imgRef = useRef<ReactCropperElement | null>(null);
  const imgHeightRef = useRef(null);
  const { search } = useLocation();
  const optionIcon = search.includes('NUTRITIONIST');

  useEffect(() => {
    if (isScan) {
      (async () => {
        if (
          inputImage.imageFileFormat &&
          inputImage.imageFileName &&
          inputImage.imgURL
        ) {
          const scanImage: ScanImg = {
            imgURL: inputImage.imgURL,
            imageFileName: inputImage.imageFileName,
            imageFileFormat: inputImage.imageFileFormat,
          };
          await handleScanImg(scanImage);
        }
      })();
    }
  }, [inputImage.imgURL]);

  const handlerImgLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const imgURL = event.target?.result;

        if (typeof imgURL === 'string') {
          const splitIndex = file.name.lastIndexOf('.');
          const imageFileName = file.name.substring(0, splitIndex);
          const imageFileFormat = file.name.substring(splitIndex + 1);

          setInputImage((prev) => ({
            ...prev,
            imgURL,
            imageFileName: imageFileName,
            imageFileFormat: imageFileFormat,
          }));
          setModalOpen(true);
        }
      };
      fileReader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleScanImg = async ({
    imgURL,
    imageFileName,
    imageFileFormat,
  }: ScanImg) => {
    const responseOCR = await requestOCR({
      dataURL: imgURL.split(',')[1],
      imageFileName,
      imageFileFormat,
    });

    if (responseOCR && responseOCR.fields && valuesRef.current?.option) {
      const { fields } = responseOCR;
      const inferText = fields.reduce(
        (acc, { inferText }) => (acc += ' ' + inferText),
        '',
      );

      if (inferText !== '') {
        const option = valuesRef.current.option;
        const responseInferText = await ingredients({
          inferText,
          option,
        });
        valuesRef.current = {
          ...valuesRef.current,
          inferText: responseInferText,
        };
      }
    }
    scanToggle(false);
  };

  const handleButtonImgLoad = () => {
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.click();
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const changeInputImg = (changeImg: string) => {
    if (inputImage.beforeImg !== changeImg && imgRef.current) {
      scanToggle(true);
    }
    setInputImage((prev) => ({
      ...prev,
      imgURL: changeImg,
    }));
  };

  return (
    <>
      <label htmlFor="file">
        <ImgContainer
          $isScan={
            (isScan && valuesRef.current?.inferText !== undefined) ||
            inputImage.imgURL !== imgLoad
          }
        >
          <ScanbarContainer>
            <div ref={imgHeightRef}>
              <LoadImg
                src={inputImage.imgURL}
                alt="Loaded Image"
                ref={imgRef}
              />
            </div>
            {isScan && <ScanBar imgHeightRef={imgHeightRef}></ScanBar>}
          </ScanbarContainer>
          <ImgUpload
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png, .pdf, .tiff"
            disabled={isScan}
            onChange={handlerImgLoad}
          />
          {inputImage.imgURL === imgLoad && (
            <Explanation>
              <CircleImg src={circle} />
              <NutritionistImg
                src={optionIcon ? nutritionist : chemist}
              ></NutritionistImg>
              식품의 <b> 원재료명 </b> 사진을 업로드해주세요
            </Explanation>
          )}
        </ImgContainer>
      </label>

      {inputImage.imgURL !== imgLoad ? (
        isScan ? (
          <StateText>사진이 흔들리지 않았는지 확인해주세요.</StateText>
        ) : (
          <EndText>
            {valuesRef.current?.inferText === undefined
              ? '*요청실패 재업로드'
              : '*결과를 확인해주세요'}
          </EndText>
        )
      ) : null}
      <Button isDisabled={isScan} onClick={handleButtonImgLoad}>
        {isScan ? (
          <ButtonStateText />
        ) : inputImage.imgURL !== imgLoad ? (
          '사진 재업로드'
        ) : (
          '사진 업로드'
        )}
      </Button>

      <CropperModal
        isOpen={modalOpen}
        imgRef={imgRef}
        inputImage={inputImage}
        closeModal={closeModal}
        changeInputImg={changeInputImg}
      ></CropperModal>
    </>
  );
};

export default ImgLoad;
