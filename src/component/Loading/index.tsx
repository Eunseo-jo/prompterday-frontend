import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components';
import LogoImage from '../../assets/Logo.svg';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: keep-all;

  span {
    display: flex;
    font-size: 1.25rem;
    font-weight: var(--font-regular);
    margin: 100px 0;
  }

  img {
    margin-top: 45px;
    margin-bottom: 120px;
  }
`;

const LoadingCircleContainer = styled.div`
  width: 163px;
  height: 163px;
  position: relative;

  .CircularProgressbar {
    position: relative;
    vertical-align: middle;
  }

  p {
    position: absolute;
    top: calc(100% + 30px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--color-main);
    font-size: 2.5rem;
    font-weight: var(--font-bold);
    line-height: 1.875rem;
  }
`;

const LoadingPage = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 350);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <img src={LogoImage} />

      <LoadingCircleContainer>
        <CircularProgressbar
          value={percentage}
          styles={{
            path: {
              stroke: 'var(--color-main)',
              strokeLinecap: 'round',
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            },
            trail: { stroke: 'var(--color-sub-1)' },
          }}
        />
        <p>{percentage}%</p>
      </LoadingCircleContainer>
      <span>제품의 영양성분을 분석중입니다</span>
    </Wrapper>
  );
};

export default LoadingPage;
