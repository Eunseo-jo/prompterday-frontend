import { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';

const scanAnimation = (height: number) => keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(${height}px);
  }
`;

const ScanContainer = styled.span<{ height: number }>`
  position: absolute;
  width: 140%;
  height: 220px;
  left: -20%;
  border-top: 3px solid var(--color-main);

  backdrop-filter: saturate(30%);

  animation: 3s infinite ${({ height }) => scanAnimation(height)};
`;

interface ScanBar {
  height: number;
  isScan: boolean;
}

const ScanBar = ({ height, isScan }: ScanBar) => {
  return <ScanContainer height={height}></ScanContainer>;
};

export default ScanBar;
