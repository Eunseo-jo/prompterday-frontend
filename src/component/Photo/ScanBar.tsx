import { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';

const scanAnimation = (height: number) => keyframes`
  0%, 100% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(${-height}px);
  }
`;

const ScanContainer = styled.span<{ height: number }>`
  position: absolute;
  width: 140%;
  height: 220px;
  left: -20%;
  border-top: 3px solid var(--color-main);

  backdrop-filter: sepia(40%);

  animation: 3s infinite ${({ height }) => scanAnimation(height)};
`;

const ScanBar = ({
  imgHeightRef,
}: {
  imgHeightRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (imgHeightRef.current) {
        setHeight(imgHeightRef.current.getBoundingClientRect().height);
      }
    }, 0);
    //cropper 라이브러리 비동기 작업으로 인한 setTimeout

    return () => clearTimeout(timeoutId);
  }, [imgHeightRef]);

  return <ScanContainer height={height}></ScanContainer>;
};

export default ScanBar;
