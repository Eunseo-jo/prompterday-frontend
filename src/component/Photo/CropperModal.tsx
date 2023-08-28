import ReactModal from 'react-modal';
import Cropper from 'react-cropper';
import { styled } from 'styled-components';
import Back from '../common/Back';
import { useEffect, useState } from 'react';
import 'cropperjs/dist/cropper.css';
import { InputImage } from '@/types/photo';
import Icon from '../common/Icon';

const StyledCropper = styled(Cropper)`
  .cropper-modal {
    background-color: transparent;
  }

  .cropper-view-box {
    outline-color: var(--color-main);
  }
  .cropper-point {
    background-color: var(--color-sub-3);
  }
`;
interface CropperModalProps {
  isOpen: boolean;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
  inputImage: InputImage;
  closeModal: () => void;
}

const CropperModal = ({
  isOpen,
  imgRef,
  inputImage,
  closeModal,
}: CropperModalProps) => {
  const customModalStyles: ReactModal.Styles = {
    content: {
      width: '100%',
      height: '100vh',
      maxWidth: '390px',
      zIndex: '10',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'rgb(40, 43, 45)',
    },
  };

  const onCrop = () => {
    const imageElement = imgRef?.current;
    const cropper = imageElement?.cropper;
    // setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };
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

      <StyledCropper
        viewMode={1}
        background={false}
        zoomable={false}
        scalable={false}
        src={inputImage.imgURL}
        crop={onCrop}
        ref={imgRef}
      />
      <button onClick={rotateImage}>Rotate</button>
    </ReactModal>
  );
};

export default CropperModal;
