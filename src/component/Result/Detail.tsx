import { ResponseItem } from '../../types/common';
import { DangerLabel, WarnLabel, NormalLabel } from './Labels';
import styled from 'styled-components';
import Modal from '../common/Modal';

const Line = styled.hr`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 16px;
  background: #dadada;
  box-sizing: border-box;
  border: none;
  height: 1px;
`;

const H3 = styled.h3`
  font-size: 0.875rem;
  font-weight: var(--font-bold);
  margin: 0;
  margin-top: 9px;
  box-shadow: none;
`;

const P = styled.p`
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: var(--font-regular);
  text-align: center;
  word-break: keep-all;
  margin-bottom: 11px;
  span {
    color: var(--color-danger);
    margin-bottom: 13px;
  }
`;

interface DetailProps {
  isOpen: boolean;
  closeModal: () => void;
  item: ResponseItem | null;
}

const Detail = ({ isOpen, closeModal, item }: DetailProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {item?.criteria === 1 ? (
        <NormalLabel />
      ) : item?.criteria === 2 ? (
        <WarnLabel />
      ) : (
        <DangerLabel />
      )}
      <H3>{item?.name}</H3>
      <Line />

      <P>
        {item?.characteristic}
        <br /> <span>{item?.reason}</span>
      </P>
    </Modal>
  );
};

export default Detail;
