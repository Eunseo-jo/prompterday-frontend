import { ResponseItem } from '../../types/common';
import { DangerLabel, WarnLabel, NormalLabel } from './Labels';
import styled from 'styled-components';
import Icon from '../common/Icon';
import Modal from '../common/Modal';

interface DetailProps {
  isOpen: boolean;
  closeModal: () => void;
  item: ResponseItem | null;
}

const CloseButton = styled.div`
  width: 100%;
  padding: 5px 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;

const Line = styled.hr`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  background: #dadada;
  box-sizing: border-box;
`;

const H3 = styled.h3`
  font-size: 0.875rem;
  font-weight: var(--font-bold);
  margin: 0;
  margin-top: 9px;
`;

const P = styled.p`
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.875rem;
  font-weight: var(--font-regular);
  text-align: center;
  word-break: keep-all;
  &.warning {
    color: var(--color-danger);
    margin-bottom: 13px;
  }
`;

const Detail = ({ isOpen, closeModal, item }: DetailProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <CloseButton>
        <Icon icon="close" size={20} onClick={closeModal} color="black" />
      </CloseButton>
      {item?.criteria === 1 ? (
        <NormalLabel />
      ) : item?.criteria === 2 ? (
        <WarnLabel />
      ) : (
        <DangerLabel />
      )}
      <H3>{item?.name}</H3>
      <Line />

      <P>{item?.characteristic}</P>
      <P className="warning">{item?.reason}</P>
    </Modal>
  );
};

export default Detail;
