import ReactModal from 'react-modal';
import Cropper from 'react-cropper';
import { styled } from 'styled-components';
import Back from '../common/Back';
import { useRef, useState } from 'react';
import 'cropperjs/dist/cropper.css';

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

const CropperModal = () => {
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

  const cropperRef = useRef(null);
  // 유저가 첨부한 이미지
  const [inputImage, setInputImage] = useState(null);
  // 유저가 선택한 영역만큼 크롭된 이미지
  const [croppedImage, setCroppedImage] = useState(null);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
  };
  const rotateImage = () => {
    if (cropperRef.current) {
      cropperRef.current.cropper.rotate(4);
    }
  };
  return (
    <ReactModal isOpen={true} style={customModalStyles}>
      <Back />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))}
      />
      <StyledCropper
        viewMode={1}
        background={false}
        zoomable={false}
        scalable={false}
        src={inputImage}
        crop={onCrop}
        ref={cropperRef}
      />
      <button onClick={rotateImage}>Rotate</button>
      <img src={croppedImage} />
    </ReactModal>
  );
};

export default CropperModal;
