import styled, { keyframes } from "styled-components";
import is from "styled-is";

interface IAnimatedLetterProps {
  isLast?: boolean;
}

const active = keyframes`
  0% {
    bottom: 0rem;
    height: 0rem;
    transform: translate(-50%, 0%);
  }
  
  50% {
    bottom: 0.125rem;
    height: 0.35rem;
    transform: translate(-50%, 7.5%);
  }

  100% {
    bottom: 0rem;
    height: 0rem;
    transform: translate(-50%, 0%);
  }
`;

const activeLast = keyframes`
  0% {
    bottom: 0rem;
    height: 0rem;
    transform: translate(-50%, 0%);
  }
  
  50% {
    bottom: 0.125rem;
    height: 0.35rem;
    transform: translate(-50%, 7.5%);
  }

  100% {
    bottom: 0.125rem;
    height: 0.35rem;
    transform: translate(-50%, 7.5%);
  }
`;

const move = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 0;
  }
  
  50% {
    transform: translateY(-7.5%);
    opacity: 1;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const moveLast = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 0;
  }
  
  50% {
    transform: translateY(-7.5%);
    opacity: 1;
  }

  100% {
    transform: translateY(-7.5%);
    opacity: 1;
  }
`;

const getAnimationDelay = () => {
  let animationDelay = "";

  for (let i = 0; i < 8; i++) {
    animationDelay += `
    &:nth-child(${i + 1}) {
      animation-delay: ${(i * 0.25).toFixed(2)}s;
      &::after {
        animation-delay: ${(i * 0.25).toFixed(2)}s;
      }
    }
  `;
  }

  return animationDelay;
};

export const Container = styled.div`
  height: calc(100vh - 5rem);
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  height: 100%;
  padding-top: 3rem;
`;

export const AnimatedContainer = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 7rem;
  line-height: 6rem;

  display: flex;

  @media screen and (max-width: 768px) {
    font-size: 5rem;
    line-height: 5rem;
  }
`;

export const AnimatedLetter = styled.span<IAnimatedLetterProps>`
  display: block;
  position: relative;
  opacity: 0;

  animation: ${move} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  -webkit-animation: ${move} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  ${is("isLast")`
      animation: ${moveLast} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      -webkit-animation: ${moveLast} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `}

  ${getAnimationDelay()}

  &:after {
    animation: ${active} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-animation: ${active} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    content: "";
    display: block;
    width: 1.25rem;
    height: 0rem;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translate(-50%, 0%);
    transition: all 0.2s;

    ${is("isLast")`
      animation: ${activeLast} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      -webkit-animation: ${activeLast} 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `}
  }
`;

export const ButtonsContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

  gap: 3rem;

  a {
    padding: 1rem 2rem;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    transition: filter 0.3s;
    font-size: 1.5rem;
    width: 15rem;
    text-align: center;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const PreviewButton = styled.button`
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  transition: filter 0.3s;
  font-size: 1.5rem;
  width: 15rem;
  text-align: center;
  font-family: ${({ theme }) => theme.font.primary};
  font-style: italic;
  position: relative;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &:after {
    content: "EM BREVE!!";
    position: absolute;
    top: -0.5rem;
    right: -2.5rem;
    font-size: 1.25rem;
    transform: rotate(15deg);
  }
`;
