import ReactModal from 'react-modal';
import Cropper from 'react-cropper';
import { styled } from 'styled-components';
import { InputImage } from '@/types/photo';
import Icon from '../common/Icon';
import check from '../../assets/check.svg';
import cancel from '../../assets/cancel.svg';
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
`;

const CloseContainer = styled.div`
  width: 100%;
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
    grid-column-start: 9;
  }
`;

const RangeInput = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  width: 100%;
  height: 0.8125rem;
  background: #ffffff;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1875rem;
    height: 2.0625rem;
    background-color: var(--color-main);
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0.1875rem;
    height: 2.0625rem;
    background-color: var(--color-main);
  }
`;

interface CropperModalProps {
  isOpen: boolean;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
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
      justifyContent: 'space-between',

      overflow: 'hidden',
    },
  };
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const rangeRef = useRef<HTMLInputElement | null>(null);

  const onCrop = () => {
    const imageElement = imgRef?.current;
    const cropper = imageElement?.cropper;

    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  const completeCropper = () => {
    // imgRef?.current?.cropper.getCroppedCanvas().height
    changeInputImg(croppedImage);
    closeModal();
  };

  const closeCropper = () => {
    changeInputImg(inputImage.beforeImg);
    closeModal();
  };

  //    imgRef?.current?.cropper.reset(); 리셋

  const rotateImage = () => {
    if (imgRef.current && rangeRef.current) {
      const currentRangeValue = rangeRef.current.value;
      imgRef.current.cropper.rotateTo(currentRangeValue);
    }
  };

  return (
    <ReactModal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
    >
      {/* <CloseContainer onClick={closeModal}>
        <Icon icon="close" size={20} color="var(--color-sub-2)" />
      </CloseContainer> */}

      <StyledCropper
        viewMode={1} //회의 필요
        background={false}
        src={inputImage.imgURL}
        crop={onCrop}
        ref={imgRef}
        autoCropArea={1} // crop 편집 박스 초기 크기
        minContainerHeight={420} // crop 최대 크기
        minContainerWidth={370}
        dragMode={'move'}
        restore={false}
        // rotatable 회전
      />

      <EditContainer>
        <RangeInput
          min="-180"
          max="180"
          onChange={rotateImage}
          ref={rangeRef}
        ></RangeInput>
        <img src={cancel} alt="취소" onClick={closeCropper} />
        <img src={check} alt="확인" onClick={completeCropper} />
        {/* <button onClick={rotateImage}>Rotate</button> */}
      </EditContainer>
    </ReactModal>
  );
};

export default CropperModal;
