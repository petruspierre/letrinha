import styled, { keyframes } from "styled-components";

const ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const AnimatedLoading = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;

  svg {
    height: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Ring = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:after {
    content: " ";
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 8px;
    border-radius: 50%;
    border: 3px dotted ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary} transparent
      ${({ theme }) => theme.colors.primary} transparent;
    animation: ${ring} 1s cubic-bezier(0.34, 0.63, 0.82, 0.43) infinite;
  }
`;
