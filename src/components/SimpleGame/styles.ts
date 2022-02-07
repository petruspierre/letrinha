import styled, { keyframes } from "styled-components";
import is from "styled-is";

interface FieldProps {
  isActive: boolean;
  exists: boolean;
  correctPlace: boolean;
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
  padding: 2rem 1rem;
`;

export const FieldsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 1rem;

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
`;

export const Field = styled.div<FieldProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  height: 3.5rem;
  width: 3.5rem;

  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.primary};
  text-transform: uppercase;
  font-size: 2rem;

  transition: all 0.1s ease-in-out;

  ${is("isActive")`
    border-bottom-width: 6px;
  `}

  ${is("exists")`
    border-color: yellow;
  `}

  ${is("correctPlace")`
    border-color: green;
  `}
`;

export const Footer = styled.section`
  display: flex;
  flex-direction: column;
  height: 16rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
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
  z-index: 10;

  padding: 2rem;
  text-align: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);

  h2 {
    color: ${({ theme }) => theme.colors.white};
  }
`;
