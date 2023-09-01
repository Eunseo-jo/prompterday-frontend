import ReactModal from 'react-modal';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { styled } from 'styled-components';
import { InputImage } from '@/types/photo';
import check from '../../assets/check.svg';
import cancel from '../../assets/cancel.svg';
import refresh from '../../assets/refresh.svg';
import 'cropperjs/dist/cropper.css';
import { useRef, useState } from 'react';

const StyledCropper = styled(Cropper)`
  .cropper-modal {
    background-color: transparent;
  }

  .cropper-view-box {
    outline: 2px solid var(--color-main);
  }

  .cropper-point {
    background-color: var(--color-sub-3);
  }

  .cropper-modal {
    backdrop-filter: blur(100px);
  }
`;

const EditContainer = styled.div`
  width: 100%;
  height: 20%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);

  :nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 10;
  }
  :nth-child(2) {
    grid-row-start: 2;
    grid-column-start: 1;
  }
  :nth-child(3) {
    grid-row-start: 2;
    grid-column-start: 5;
  }
  :nth-child(4) {
    grid-row-start: 2;
    grid-column-start: 9;
  }
`;

const RangeInputContainer = styled.div`
  position: relative;
`;

const RangeInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  height: 0.8125rem;
  position: relative;
  z-index: 10;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1875rem;
    height: 1.6rem;
    background-color: var(--color-main);
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1875rem;
    height: 1.6rem;
    background-color: var(--color-main);

    z-index: 20;
  }
`;

const RangeStyledContainer = styled.div`
  position: absolute;

  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 6px;
`;

const RotationMark = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  color: var(--color-sub-1);

  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 1.25rem;

  margin: 20px 0;
`;

const CenterMark = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: white;

  position: absolute;
  top: -3%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RangeStyled = styled.div<{ $index: number }>`
  width: ${({ $index }) => ($index === 9 ? '0' : '0.496rem')};
  height: 0.8125rem;
  border: 1.3px solid var(--color-sub-2);
  border-top: none;
  border-bottom: none;

  ${({ $index }) => {
    const borderStyles = getBorderStyle($index);
    let styles = '';

    for (const [key, value] of Object.entries(borderStyles)) {
      styles += `border-${key}-color: ${value};`;
    }

    return styles;
  }}
`;

const getBorderStyle = (index: number) => {
  const baseStyle = 'var(--color-sub-2)';
  const specialStyle = 'var(--color-sub-1)';

  if (index === 0 || index === 14) {
    return { left: specialStyle };
  } else if (index === 4 || index === 18) {
    return { right: specialStyle };
  } else if (index === 9) {
    return { left: specialStyle, right: specialStyle };
  }

  return { left: baseStyle, right: baseStyle };
};

interface CropperModalProps {
  isOpen: boolean;
  imgRef: React.MutableRefObject<ReactCropperElement | null>;
  inputImage: InputImage;
  closeModal: () => void;
  changeInputImg: (changeImg: string) => void;
}

const CropperModal = ({
  isOpen,
  imgRef,
  inputImage,
  closeModal,
  changeInputImg,
}: CropperModalProps) => {
  const customModalStyles: ReactModal.Styles = {
    content: {
      width: '100%',
      height: '100vh',
      maxWidth: '390px',
      padding: '40px 20px',
      zIndex: '10',
      boxSizing: 'border-box',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'rgb(40, 43, 45)',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',

      overflow: 'hidden',
    },
  };
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);

  const onCrop = () => {
    const imageElement = imgRef?.current;
    const cropper = imageElement?.cropper;

    if (cropper !== undefined) {
      setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const completeCropper = () => {
    if (croppedImage !== null) {
      changeInputImg(croppedImage);
      closeModal();
    }
  };

  const closeCropper = () => {
    changeInputImg(inputImage.beforeImg);
    closeModal();
  };

  const refreshCropper = () => {
    if (rangeRef.current) {
      rangeRef.current.value = '0';
    }

    if (imgRef && imgRef.current && imgRef.current.cropper) {
      imgRef.current.cropper.reset();
    }
  };

  const rotateImage = () => {
    if (imgRef.current && rangeRef.current) {
      const currentRangeValue = Number(rangeRef.current.value);
      imgRef.current.cropper.rotateTo(currentRangeValue);
    }
  };

  return (
    <ReactModal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <StyledCropper
        viewMode={1}
        background={false}
        src={inputImage.imgURL}
        crop={onCrop}
        ref={imgRef}
        autoCropArea={0.7} // crop 편집 박스 초기 크기
        minContainerHeight={420} // crop 최대 크기
        minContainerWidth={370}
        dragMode={'move'}
        restore={false}
        // rotatable 회전
      />

      <RotationMark>{rangeRef.current && rangeRef.current.value}</RotationMark>
      <EditContainer>
        <RangeInputContainer>
          <RangeInput
            min="-180"
            max="180"
            onChange={rotateImage}
            ref={rangeRef}
          />
          <RangeStyledContainer>
            {Array.from({ length: 19 }, (_, index) => (
              <RangeStyled key={index} $index={index} />
            ))}
          </RangeStyledContainer>
          <CenterMark />
        </RangeInputContainer>
        <img src={cancel} alt="취소" onClick={closeCropper} />
        <img src={check} alt="확인" onClick={completeCropper} />
        <img src={refresh} alt="새로고침" onClick={refreshCropper} />
      </EditContainer>
    </ReactModal>
  );
};

export default CropperModal;
