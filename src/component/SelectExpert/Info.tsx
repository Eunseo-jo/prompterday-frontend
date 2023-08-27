import styled from 'styled-components';
import Modal from '../common/Modal';

const H3 = styled.div`
  width: 145px;
  height: 24px;
  background: var(--color-main);
  color: white;
  font-size: 0.875rem;
  font-weight: var(--font-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const P = styled.p`
  color: black;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: var(--font-regular);
  word-break: keep-all;
  text-align: center;
  margin-bottom: 11px;
`;

interface InfoProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Info = ({ isOpen, closeModal }: InfoProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} topValue="30%">
      <H3>누구를 선택해야하나요?</H3>
      <P>
        식품(과자, 음료수, 도시락 등)은 영양사에게 <br />
        의약품(타이레놀, 영양제 등)은 약사에게 물어보세요
      </P>
    </Modal>
  );
};

export default Info;
