import { useEffect, useState } from 'react';
import { ResponseItem, Results } from '../../types/common';
import { DangerLabel, WarnLabel, NormalLabel } from './Labels';
import styled from 'styled-components';
import Icon from '../common/Icon';
import Detail from './Detail';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  section {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
`;

const ResultSummary = styled.div`
  width: 100%;
  height: 105px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.15);
  padding: 0 20px;
  box-sizing: border-box;
  p {
    color: var(--color-sub-2);
    font-size: 0.875rem;
    font-weight: var(--font-regular);

    span {
      color: var(--color-main);
      font-size: 1.25rem;
      font-weight: var(--font-bold);
    }
  }
  span {
    font-size: 0.75rem;
    font-weight: var(--font-regular);
    color: var(--color-sub-2);
  }
`;

const LabelBox = styled.ul`
  height: 30px;
  display: flex;
  font-weight: var(--font-bold);
  li {
    display: flex;
    align-items: center;
    margin-right: 15px;
    span {
      color: black;
      font-size: 0.875rem;
      font-weight: var(--font-bold);
      margin-left: 5px;
    }
  }
`;

const DetailList = styled.ul`
  width: 100%;
  height: 350px;
  list-style: none;
  overflow-y: auto;
  margin-bottom: 35px;
  li {
    width: 100%;
    max-width: 330px;
    height: 45px;
    display: flex;
    align-items: center;
    border: 1px solid var(--color-sub-1);
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 0.875rem;
    font-weight: var(--font-regular);

    span {
      max-width: 220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      margin-left: 5px;
    }
    svg {
      cursor: pointer;
    }
  }

  li:first-child {
    margin-top: 15px;
  }
`;

const Analysis = ({ resultData }: { resultData: ResponseItem[] }) => {
  const [selectedItem, setSelectedItem] = useState<ResponseItem | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [result, setResult] = useState<Results>({
    danger: [],
    warn: [],
    normal: [],
  });

  useEffect(() => {
    const danger: ResponseItem[] = [];
    const warn: ResponseItem[] = [];
    const normal: ResponseItem[] = [];

    resultData.map((item) => {
      if (item.criteria === 1) {
        normal.push(item);
      } else if (item.criteria === 2) {
        warn.push(item);
      } else if (item.criteria === 3) {
        danger.push(item);
      }
    });

    setResult({
      danger,
      warn,
      normal,
    });
  }, []);
  const labels = [
    { id: 'danger', label: <DangerLabel />, items: result.danger },
    { id: 'warn', label: <WarnLabel />, items: result.warn },
    { id: 'normal', label: <NormalLabel />, items: result.normal },
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Wrapper>
      <ResultSummary>
        <p>
          이 제품은 <span>먹어도 괜찮아요</span>
        </p>
        <span>*AI답변이므로 정확한 내용은 의사와 상담하세요</span>
        <LabelBox>
          {labels.map((label) => (
            <li key={label.id}>
              {label.label}
              <span>{label.items.length}개</span>
            </li>
          ))}
        </LabelBox>
      </ResultSummary>

      <DetailList>
        {labels.map((label) =>
          label.items.map((item) => (
            <li key={item.name}>
              {label.label}
              <span>{item.name}</span>
              <Icon
                icon="detail"
                size={18}
                color="var(--color-main)"
                onClick={() => {
                  openModal();
                  setSelectedItem(item);
                }}
              />
            </li>
          )),
        )}
      </DetailList>
      <Detail
        isOpen={modalIsOpen}
        closeModal={closeModal}
        item={selectedItem}
      />
    </Wrapper>
  );
};

export default Analysis;
