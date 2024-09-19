import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ScrollStyle = styled.div`
    opacity: 0;
    min-height: 100vh;
    &.visible {
        animation: ${fadeInUp} 1s forwards;
    }
`;
