import styled, { keyframes } from "styled-components";
import is from "styled-is";

interface FieldProps {
  isActive: boolean;
  exists: boolean;
  correctPlace: boolean;
  blur: boolean;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  min-width: 25rem;
  max-width: 100%;
  align-items: center;

  @media screen and (min-width: 1024px) {
    width: 100%;
  }
`;

export const FieldsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media screen and (max-width: 768px) {
    overflow-y: scroll;
    max-height: calc(100vh - 24rem);
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  animation: ${fadeIn} 0.3s ease-in-out;

  & + div {
    margin-top: 1rem;
  }

  @media screen and (min-width: 1024px) {
    gap: 1rem;
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

@media screen and (min-width: 1024px) {
    height: 5rem;
    width: 5rem;
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
  width: 100%;
  max-width: 553px;
  padding-top: 1rem;

  @media screen and (max-width: 768px) {
    width: calc(100% - 2rem);
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }

  p {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.font.primary};
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
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;~
    font-family: ${({ theme }) => theme.font.primary};
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border-radius: 8px;

    transition: all 0.2s;

    & + button {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary};
      margin-top: 0.5rem;
    }

    & :hover {
      filter: brightness(0.8);
    }
  }
`;
