import { useEffect, useState } from 'react';
import { ResponseItem, Result } from '../../types/common';
import styled from 'styled-components';
import Icon from '../common/Icon';

import { DangerLabel, WarnLabel, NormalLabel } from './Labels';

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
  margin-bottom: 15px;
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
  height: 335px;
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
`;

const Analysis = () => {
  const [result, setResult] = useState<Result>({
    danger: [],
    warn: [],
    normal: [],
  });
  const jsonResult = {
    response: [
      {
        name: '카페인',
        criteria: 2,
        reason:
          '과다 섭취 시 수면장애, 심장박동 증가 등의 부작용이 있을 수 있습니다.',
        characteristic: '음료나 음식에 첨가되어 각성 효과를 주는 성분입니다.',
        intake: '400mg 이하',
      },
      {
        name: '아스파탐',
        criteria: 3,
        reason:
          '과다 섭취 시 두통, 어지러움, 심장박동 증가 등의 부작용이 있을 수 있습니다.',
        characteristic: '인공 감미료로 사용되며, 음료나 음식에 첨가됩니다.',
        intake: null,
      },
      {
        name: '알로에',
        criteria: 1,
        reason: null,
        characteristic:
          '식물로부터 추출된 성분으로, 주로 피부에 사용되는데 건강에 해로운 부작용은 없습니다.',
        intake: null,
      },
      {
        name: '밀가루',
        criteria: 1,
        reason: null,
        characteristic: '주로 빵, 과자, 면 등의 제품에 사용되는 원재료입니다.',
        intake: null,
      },
      {
        name: '가공유지(팜분별유(부분경화유:말레이시아산)가공유지(팜분별유(부분경화유:말레이시아산',
        criteria: 3,
        reason:
          '과다 섭취 시 고지혈증, 심장질환 등의 위험을 초래할 수 있습니다.',
        characteristic: '식품가공 과정에서 사용되는 기름 성분입니다.',
        intake: null,
      },
      {
        name: '알로에',
        criteria: 1,
        reason: null,
        characteristic:
          '식물로부터 추출된 성분으로, 주로 피부에 사용되는데 건강에 해로운 부작용은 없습니다.',
        intake: null,
      },
      {
        name: '밀가루',
        criteria: 1,
        reason: null,
        characteristic: '주로 빵, 과자, 면 등의 제품에 사용되는 원재료입니다.',
        intake: null,
      },
      {
        name: '가공유지(팜분별유(부분경화유:말레이시아산)가공유지(팜분별유(부분경화유:말레이시아산',
        criteria: 3,
        reason:
          '과다 섭취 시 고지혈증, 심장질환 등의 위험을 초래할 수 있습니다.',
        characteristic: '식품가공 과정에서 사용되는 기름 성분입니다.',
        intake: null,
      },
      {
        name: '알로에',
        criteria: 1,
        reason: null,
        characteristic:
          '식물로부터 추출된 성분으로, 주로 피부에 사용되는데 건강에 해로운 부작용은 없습니다.',
        intake: null,
      },
      {
        name: '밀가루',
        criteria: 1,
        reason: null,
        characteristic: '주로 빵, 과자, 면 등의 제품에 사용되는 원재료입니다.',
        intake: null,
      },
      {
        name: '가공유지(팜분별유(부분경화유:말레이시아산)가공유지(팜분별유(부분경화유:말레이시아산',
        criteria: 3,
        reason:
          '과다 섭취 시 고지혈증, 심장질환 등의 위험을 초래할 수 있습니다.',
        characteristic: '식품가공 과정에서 사용되는 기름 성분입니다.',
        intake: null,
      },
    ],
  };

  const labels = [
    { id: 'danger', label: <DangerLabel />, items: result.danger },
    { id: 'warn', label: <WarnLabel />, items: result.warn },
    { id: 'normal', label: <NormalLabel />, items: result.normal },
  ];

  useEffect(() => {
    const danger: ResponseItem[] = [];
    const warn: ResponseItem[] = [];
    const normal: ResponseItem[] = [];
    jsonResult.response.map((item) => {
      if (item.criteria === 1) {
        danger.push(item);
      } else if (item.criteria === 2) {
        warn.push(item);
      } else if (item.criteria === 3) {
        normal.push(item);
      }
    });

    setResult({
      danger,
      warn,
      normal,
    });
  }, []);

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
              <Icon icon="detail" size={18} color="var(--color-main)" />
            </li>
          )),
        )}
      </DetailList>
    </Wrapper>
  );
};

export default Analysis;
