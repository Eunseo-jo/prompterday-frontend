import ReactModal from 'react-modal';
import Cropper from 'react-cropper';
import { styled } from 'styled-components';
import { InputImage } from '@/types/photo';
import Icon from '../common/Icon';
import 'cropperjs/dist/cropper.css';
import { useState } from 'react';

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

const CropperContainer = styled.section`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  z-index: -10;
  box-sizing: border-box;
`;
interface CropperModalProps {
  isOpen: boolean;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
  inputImage: InputImage;
  closeModal: () => void;
  changInputImg: (URL: string) => void;
}

const CropperModal = ({
  isOpen,
  imgRef,
  inputImage,
  closeModal,
  changInputImg,
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
    },
  };
  const [croppedImage, setCroppedImage] = useState(null);

  const onCrop = () => {
    const imageElement = imgRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };

  //확인(완료)버튼 눌렀을때
  //// changInputImg(cropper.getCroppedCanvas().toDataURL());

  const rotateImage = () => {
    if (imgRef.current) {
      imgRef.current.cropper.rotate(4);
    }
  };

  return (
    <ReactModal
      onRequestClose={closeModal}
      isOpen={isOpen}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div onClick={closeModal}>
        <Icon icon="close" size={20} color="var(--color-sub-2)" />
      </div>

      <CropperContainer>
        <StyledCropper
          viewMode={1}
          background={false}
          src={inputImage.imgURL}
          crop={onCrop}
          ref={imgRef}
          autoCropArea={1} // crop 편집 박스 초기 크기
          minContainerHeight={430} // crop 최대 크기
          // rotatable 회전
        />
      </CropperContainer>
    </ReactModal>
  );
};

export default CropperModal;
