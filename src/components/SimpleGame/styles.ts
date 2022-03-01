import styled, { keyframes } from "styled-components";
import is, { isNot } from "styled-is";

interface FieldProps {
  isActive: boolean;
  exists: boolean;
  correctPlace: boolean;
  blur: boolean;
}

interface FieldsContainerProps {
  isKeyboardVisible: boolean;
}

const fadeIn = keyframes`
  from {
    transform: translateY(-25%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(0px, 0, 0);
  }
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem;
  min-width: 25rem;
  max-width: 100%;
  align-items: center;
  height: calc(100vh - 5rem);

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const FieldsContainer = styled.section<FieldsContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  overflow-y: scroll;
  height: calc(100vh - 15.5rem);
  max-height: calc(100vh - 15.5rem);
  transition: all 0.3s ease-in-out;
  padding-right: 0.1rem;
  max-width: 553px;

  ${isNot("isKeyboardVisible")`
    height: calc(100vh - 9.5rem) !important;
    max-height: calc(100vh - 9.5rem) !important;
    padding-right: 0 !important;
  `}

  @media screen and (min-width: 768px) {
    max-height: calc(100vh - 20.5rem);

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      width: 0.25rem;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 1rem;
    }
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  animation: ${fadeIn} 0.3s ease-in-out;

  & + div {
    margin-top: 0.5rem;
  }
`;

export const Field = styled.button<FieldProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  border: 0.25rem solid ${({ theme }) => theme.colors.primary};
  height: 3.5rem;
  width: 3.5rem;

  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.primary};
  text-transform: uppercase;
  font-size: 2.5rem;
  font-style: italic;

  transition: all 0.1s ease-in-out;

  &:focus {
    outline: 0;
  }

  &::after {
    content: "";
    display: block;
    width: 1.25rem;
    height: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    bottom: 0.25rem;
    left: 25%;
    transform: translateX(-50%);
    transition: left cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s;
  }

  ${is("isActive")`
    padding-bottom: 0.5rem;
    animation: ${shake} 0.2s cubic-bezier(.36,.07,.19,.97)  both;
    backface-visibility: hidden;
    perspective: 1000px;
    transform: translate3d(0, 0, 0);

    &::after {
      left: 50%;
      height: 0.35rem;
    }
  `}

  ${is("blur")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    color: rgba(255, 255, 255, 0.5);
  `}

  ${is("exists")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.yellow};
  `}

  ${is("correctPlace")`
    border: 0;
    background-color: ${({ theme }) => theme.colors.green};
  `}
`;

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding-top: 1rem;
  transition: background-color 0.2s;
  background-color: ${({ theme }) => theme.colors.secondary};

  width: calc(100% - 2rem);
  position: fixed;
  bottom: 0.5rem;
  left: 1rem;
  right: 1rem;

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.font.primary};
  }

  @media screen and (min-width: 768px) {
    max-width: 553px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
