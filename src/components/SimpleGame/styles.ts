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

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1rem;
  min-width: 25rem;
  max-width: 100%;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;

export const FieldsContainer = styled.section<FieldsContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;

  overflow-y: scroll;
  max-height: calc(100vh - 20.5rem);
  transition: all 0.3s;
  padding-right: 0.1rem;
  max-width: 553px;

  ${isNot("isKeyboardVisible")`
    max-height: calc(100vh - 6.5rem);
    padding-right: 0;
  `}

  @media screen and (min-width: 768px) {
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
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s;
  }

  ${is("isActive")`
    padding-bottom: 0.5rem;

    &::after {
      bottom: 0.25rem;
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

@media screen and (min-width: 1367px) {
    height: 4.5rem;
    width: 4.5rem;
    font-size: 3rem;

    ${is("isActive")`
      padding-bottom: 0.75rem;

      &::after {
        bottom: 0.5rem;
        height: 0.5rem;
      }
    `}
  }
`;

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding-top: 1rem;

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

export const GameOverWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;

  padding: 2rem;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);

  h2,
  p {
    color: ${({ theme }) => theme.colors.white};
  }

  h2 {
    font-size: 2rem;
  }

  p {
    margin-top: 0.25rem;
    font-size: 1.125rem;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;~
    font-family: ${({ theme }) => theme.font.primary};
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border-radius: 8px;

    transition: all 0.2s;

    & + button {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.secondary};
      margin-top: 0.5rem;
    }

    & :hover {
      filter: brightness(0.8);
    }
  }
`;
