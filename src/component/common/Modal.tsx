import styled from 'styled-components';
import ReactModal from 'react-modal';

const StyledModal = styled(ReactModal)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ModalProps {
  topValue?: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({
  topValue = '50%',
  isOpen,
  closeModal,
  children,
}: ModalProps) => {
  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(255, 255, 255, 0.80)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
      backdropFilter: 'blur(2.5px)',
    },
    content: {
      width: '80%',
      maxWidth: '390px',
      height: 'auto',
      zIndex: '10',
      position: 'absolute',
      top: topValue,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      border: '1px solid var(--color-main)',
      boxShadow: '1px 1px 4px 0px rgba(0, 0, 0, 0.25)    ',
      backgroundColor: 'white',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '0',
    },
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Pop up Message"
      style={customModalStyles}
      shouldFocusAfterRender={false}
      ariaHideApp={false}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
